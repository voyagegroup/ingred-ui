import * as React from "react";
import * as Styled from "./styled";
import { CountChanger, LabelDisplayRows } from "./internal/CountChanger";
import { SortableHeaderCell } from "./internal/SortableHeaderCell";
import { CellCheckbox } from "./internal/CellCheckbox";
import { CellRadio } from "./internal/CellRadio";
import { Table } from "./internal/Table";
import Typography, { TypographyProps } from "../Typography";
import {
  changeOrderState,
  GetValue,
  getOrder,
  sort,
  CurrentSortState,
  useOrderState,
} from "./sort";
import Spacer from "../Spacer";
import Flex from "../Flex";
import Pager, {
  useFilterState,
  getFilteredItems as getFilteredItemsByPagination,
  FilterState,
} from "../Pager";
import ItemEmpty, { ItemEmptyProps } from "../ItemEmpty";

import { StorageKey } from "../../constants/storageKeys";
import { TableTabs } from "./internal/TableTabs";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { VerticalSpacing } from "./internal/Table/Row";

const getPerFromLocalStorage = () => {
  const per = localStorage.getItem(StorageKey.DISPLAY_LIST_COUNT);
  if (per) return parseInt(per, 10);
  return 100;
};
const setPerInLocalStorage = (per: number) =>
  localStorage.setItem(StorageKey.DISPLAY_LIST_COUNT, per.toString());

function isCheckableTab<T>(currentTabIndex: number, tabs?: Tab<T>[]) {
  return !!tabs && !tabs[currentTabIndex]?.disabledCheck;
}

function isMergedCell<T extends DataTableBaseData>(
  displayData: T[],
  index: number,
  column?: Column<T>,
): boolean {
  if (index === 0) return false;
  const baseRow = displayData[index];
  const baseCell = column?.selector(baseRow);
  const previousRow = displayData[index - 1];
  const previousCell = column?.selector(previousRow);
  return (
    (!column || !!column.enableMergeCell) &&
    baseRow.id === previousRow.id &&
    baseCell === previousCell
  );
}

function calculateRowSpan<T extends DataTableBaseData>(
  displayData: T[],
  startIndex: number,
  column?: Column<T>,
): number {
  if (column && !column.enableMergeCell) return 1;
  const baseRow = displayData[startIndex];
  const baseCell = column?.selector(baseRow);
  let rowSpan = 1;
  for (let idx = startIndex + 1; idx < displayData.length; idx++) {
    const comparisonRow = displayData[idx];
    const comparisonCell = column?.selector(comparisonRow);
    if (comparisonRow.id !== baseRow.id || comparisonCell !== baseCell) {
      break;
    }
    rowSpan++;
  }
  return rowSpan;
}

function getFilteredItemsByTab<T>({
  sourceData,
  tabs,
  currentTabIndex,
}: {
  sourceData: T[];
  tabs?: Tab<T>[];
  currentTabIndex: number;
}): T[] {
  let data = sourceData;
  if (!!tabs && tabs[currentTabIndex]) {
    data = tabs[currentTabIndex].filter(data);
  }
  return data;
}

function getDisplayData<T extends DataTableBaseData>({
  sourceData,
  sortState,
  filterState,
  enablePagination,
  tabs,
  currentTabIndex,
}: {
  sourceData: T[];
  sortState: CurrentSortState<T>;
  filterState: FilterState;
  enablePagination: boolean;
  tabs?: Tab<T>[];
  currentTabIndex: number;
}): T[] {
  const data = getFilteredItemsByTab({
    sourceData,
    tabs,
    currentTabIndex,
  });
  const sortedData = sort(data, sortState);
  if (enablePagination) {
    const filteredData = getFilteredItemsByPagination(sortedData, filterState);
    return filteredData;
  }
  return sortedData;
}

export type DataTableBaseData = {
  id: number;
  selectDisabled?: boolean;
};

export type Column<T> = {
  name: string;
  selector: (data: T) => string | number;
  sortable?: boolean;
  width?: string;
  renderCell?: (data: T) => React.ReactNode;
  headerCell?: React.ReactNode;
  align?: TypographyProps["align"];
  enableMergeCell?: boolean;
};

type Tab<T> = {
  label: string;
  filter: (data: T[]) => T[];
  disabledCheck?: boolean;
};

export type DataTableProps<T> = {
  /**
   * Array of some object that has `id: number` property.
   */
  data: T[];
  /**
   * Define column of table. Please refer to the samples below.
   */
  columns: Column<T>[];
  enablePagination?: boolean;
  /**
   * Enable to use checkbox in table.
   * The argument `rows` is array of `id: number` defined in `data` props.
   * **Don't use with `onRadioChange={true}`**
   */
  onSelectRowsChange?: (rows: number[]) => void;
  /**
   * Enable to use radio button in table.
   * The argument `radio` is `id: number` defined in `data` props.
   * **Don't use with `onSelectRowsChange={true}`**
   */
  onRadioChange?: (radio: number) => void;
  /**
   * Reset selected checkboxes when this props changed to `true`.
   */
  clearSelectedRows?: boolean;
  /**
   * Define tabs of table. Please refer to the samples below.
   */
  tabs?: Tab<T>[];
  /**
   * props of [ItemEnpty](/?path=/docs/components-utils-itemempty)
   */
  itemEmptyProps?: ItemEmptyProps;
  /**
   * Number of rows per page when `enablePagination={true}`.
   * If `undefined` it, `dlc` of localStorage is referenced.
   */
  per?: number;
  /**
   * If defined `name: string` of `Column` it, enable to specify default sort Field.
   * **Please use `sortable: true` in `columns` props.**
   */
  defaultSortField?: string;
  /**
   * Specify default sort order.
   * **Please use `sortable: true` in `columns` props.**
   */
  defaultSortOrder?: "desc" | "asc";
  /**
   * Specify checked rows.
   * Not rerender when this prop is updated because it is used for initial value of state.
   * **Please use with `onSelectRowsChange={true}`.**
   */
  defaultSelectedRows?: number[];
  /**
   * Specify checked row.
   * Not rerender when this prop is updated because it is used for initial value of state.
   * **Please use with `onSelectRowChange={true}`.**
   */
  defaultSelectedRow?: number;
  /**
   * Add verticale line in table.
   */
  enableRuledLine?: boolean;
  /**
   * Define vertical padding of rows.
   */
  verticalSpacing?: VerticalSpacing;
  /**
   * If `true` it, hidden both side border.
   */
  fullWidth?: boolean;
  disableCheckWhenClickRow?: boolean;
  tableMaxHeight?: string;
  horizontalScrollable?: boolean;
  labelRowsPerPage?: string;
  labelDisplayedRows?: LabelDisplayRows;
};

const DataTable = <T extends DataTableBaseData>(
  {
    data: sourceData,
    columns,
    enablePagination = false,
    onSelectRowsChange,
    onRadioChange,
    clearSelectedRows,
    tabs,
    itemEmptyProps,
    per,
    defaultSortField,
    defaultSortOrder = "desc",
    defaultSelectedRows = [],
    defaultSelectedRow,
    enableRuledLine = false,
    verticalSpacing = "medium",
    fullWidth = false,
    disableCheckWhenClickRow = false,
    tableMaxHeight = "none",
    horizontalScrollable = false,
    labelRowsPerPage = "Rows per page:",
    labelDisplayedRows = ({ from, to, total }) => `${from}-${to} of ${total}`,
  }: DataTableProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement>,
) => {
  const showCheckbox = !!onSelectRowsChange;
  const [allSelected, setAllSelected] = React.useState(false);
  const [selectedRows, setSelectedRows] =
    React.useState<number[]>(defaultSelectedRows);
  const indeterminate = selectedRows.length > 0 && !allSelected;

  const showRadioButton = !!onRadioChange;
  const [selectedRow, setSelectedRow] = React.useState<number | null>(
    defaultSelectedRow || null,
  );

  const showTabs = !!tabs;
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const enableMergeCell = columns.some((column) => column.enableMergeCell);

  // MEMO: Sort based on the leftmost sortable column, if there's no 'defaultSortField'.
  const selectedColumn = columns.find(
    (column) => column.name === defaultSortField,
  );
  const firstSortableColumn = selectedColumn?.sortable
    ? selectedColumn
    : columns.find((column) => column.sortable === true);

  const [sortState, setSortState] = useOrderState<T>({
    isDesc: defaultSortOrder === "desc",
    name: firstSortableColumn?.name || "",
    getValue: firstSortableColumn?.selector,
  });

  const [filterState, setFilterState] = useFilterState(
    per || getPerFromLocalStorage(),
  );
  const [displayData, setDisplayData] = React.useState<T[]>(
    getDisplayData({
      sourceData,
      sortState,
      filterState,
      enablePagination,
      tabs,
      currentTabIndex,
    }),
  );

  const totalLength = React.useMemo(
    () =>
      getFilteredItemsByTab({
        sourceData,
        tabs,
        currentTabIndex,
      }).length,
    [sourceData, tabs, currentTabIndex],
  );

  useDidUpdate(() => {
    const displayData = getDisplayData({
      sourceData,
      sortState,
      filterState,
      enablePagination,
      tabs,
      currentTabIndex,
    });
    setDisplayData(displayData);
  }, [
    sourceData,
    sortState,
    filterState,
    enablePagination,
    showTabs,
    tabs,
    currentTabIndex,
  ]);

  // MEMO: Reset the pagination settings when updated 'sourceData' or 'currentTabIndex'.
  useDidUpdate(() => {
    const initialFilterState = {
      index: 1,
      per: filterState.per,
    };
    setFilterState(initialFilterState);
    const displayData = getDisplayData({
      sourceData,
      sortState,
      filterState: initialFilterState,
      enablePagination,
      tabs,
      currentTabIndex,
    });
    setDisplayData(displayData);
  }, [sourceData, currentTabIndex]);

  // MEMO: Clear selected items.
  React.useEffect(() => {
    if (clearSelectedRows) {
      setSelectedRows([]);
      if (onSelectRowsChange) {
        onSelectRowsChange([]);
      }
    }
  }, [clearSelectedRows, onSelectRowsChange]);

  React.useEffect(() => {
    if (onSelectRowsChange) {
      onSelectRowsChange(selectedRows);
    }
  }, [selectedRows, onSelectRowsChange]);
  React.useEffect(() => {
    if (onRadioChange) {
      onRadioChange(selectedRow as number);
    }
  }, [selectedRow, onRadioChange]);

  const handleTabChange = (tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  const handleSort = (getValue: GetValue<T>, name: string) => () => {
    setSortState(changeOrderState<T>(sortState, getValue, name));
  };

  const handlePagerChange = (index: number) => {
    setFilterState({ index, per: filterState.per });
  };

  const handleCountChange = (per: number) => {
    setPerInLocalStorage(per);
    setFilterState({ index: 1, per });
  };

  const handleSelectCheckbox = (id: number) => () => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectRadioButton = (id: number) => () => {
    setSelectedRow(id);
  };

  const handleToggleCheckAll = () => {
    if (selectedRows.length > 0) {
      setSelectedRows([]);
      setAllSelected(false);
    } else {
      setSelectedRows(
        displayData
          .filter((data) => !data.selectDisabled)
          .map((data) => data.id),
      );
      setAllSelected(true);
    }
  };

  return (
    <Styled.Container ref={ref}>
      <Styled.BorderContainer fullWidth={fullWidth}>
        {!!tabs && (
          <TableTabs
            value={currentTabIndex}
            items={tabs.map((tab, index) => ({
              label: tab.label,
              value: index,
            }))}
            onChange={handleTabChange}
          />
        )}
        <Styled.TableContainer
          maxHeight={tableMaxHeight}
          horizontalScrollable={horizontalScrollable}
        >
          <Table horizontalScrollable={horizontalScrollable}>
            <Table.Header>
              <Table.Row isStickyHeader={tableMaxHeight !== "none"}>
                {(!showTabs || isCheckableTab(currentTabIndex, tabs)) && (
                  <>
                    {showCheckbox && (
                      <CellCheckbox
                        header={true}
                        selected={selectedRows.length > 0}
                        indeterminate={indeterminate}
                        onClick={handleToggleCheckAll}
                      />
                    )}
                    {showRadioButton && <CellRadio header={true} />}
                  </>
                )}
                {columns.map((column) => (
                  <SortableHeaderCell
                    key={column.name}
                    sortable={column.sortable && !enableMergeCell}
                    order={getOrder(sortState, column.name)}
                    width={column.width}
                    enableRuledLine={enableRuledLine}
                    // eslint-disable-next-line react/jsx-handler-names
                    onClick={
                      column.sortable && !enableMergeCell
                        ? handleSort(column.selector, column.name)
                        : undefined
                    }
                  >
                    {column.headerCell || column.name}
                  </SortableHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {displayData.length > 0 ? (
                displayData.map((item, index) => (
                  <React.Fragment
                    key={index} // eslint-disable-line react/no-array-index-key
                  >
                    {showCheckbox || showRadioButton ? (
                      <>
                        {showCheckbox && (
                          <Table.Row
                            verticalSpacing={verticalSpacing}
                            highlighted={
                              !item.selectDisabled &&
                              (selectedRows.includes(item.id) ||
                                selectedRow === item.id)
                            }
                            disableHoverHighlight={enableMergeCell}
                            {...(!disableCheckWhenClickRow && {
                              onClick: handleSelectCheckbox(item.id),
                            })}
                          >
                            {(!showTabs ||
                              isCheckableTab(currentTabIndex, tabs)) &&
                              !isMergedCell(displayData, index) && (
                                <CellCheckbox
                                  selected={selectedRows.includes(item.id)}
                                  rowSpan={calculateRowSpan(displayData, index)}
                                  {...(disableCheckWhenClickRow && {
                                    onClick: handleSelectCheckbox(item.id),
                                  })}
                                />
                              )}
                            {columns.map((column) =>
                              isMergedCell(
                                displayData,
                                index,
                                column,
                              ) ? null : (
                                <Table.Cell
                                  key={column.name}
                                  enableRuledLine={enableRuledLine}
                                  rowSpan={calculateRowSpan(
                                    displayData,
                                    index,
                                    column,
                                  )}
                                >
                                  {column.renderCell ? (
                                    column.renderCell(item)
                                  ) : (
                                    <Typography align={column.align}>
                                      {column.selector(item)}
                                    </Typography>
                                  )}
                                </Table.Cell>
                              ),
                            )}
                          </Table.Row>
                        )}
                        {showRadioButton && (
                          <Table.Row
                            verticalSpacing={verticalSpacing}
                            highlighted={
                              !item.selectDisabled &&
                              (selectedRows.includes(item.id) ||
                                selectedRow === item.id)
                            }
                            disableHoverHighlight={enableMergeCell}
                            {...(!disableCheckWhenClickRow && {
                              onClick: handleSelectRadioButton(item.id),
                            })}
                          >
                            {(!showTabs ||
                              isCheckableTab(currentTabIndex, tabs)) &&
                              !isMergedCell(displayData, index) && (
                                <CellRadio
                                  selected={item.id === selectedRow}
                                  rowSpan={calculateRowSpan(displayData, index)}
                                  onClick={handleSelectRadioButton(item.id)}
                                />
                              )}
                            {columns.map((column) =>
                              isMergedCell(
                                displayData,
                                index,
                                column,
                              ) ? null : (
                                <Table.Cell
                                  key={column.name}
                                  enableRuledLine={enableRuledLine}
                                  rowSpan={calculateRowSpan(
                                    displayData,
                                    index,
                                    column,
                                  )}
                                >
                                  {column.renderCell ? (
                                    column.renderCell(item)
                                  ) : (
                                    <Typography align={column.align}>
                                      {column.selector(item)}
                                    </Typography>
                                  )}
                                </Table.Cell>
                              ),
                            )}
                          </Table.Row>
                        )}
                      </>
                    ) : (
                      <Table.Row
                        verticalSpacing={verticalSpacing}
                        highlighted={
                          !item.selectDisabled &&
                          (selectedRows.includes(item.id) ||
                            selectedRow === item.id)
                        }
                        disableHoverHighlight={enableMergeCell}
                      >
                        {columns.map((column) =>
                          isMergedCell(displayData, index, column) ? null : (
                            <Table.Cell
                              key={column.name}
                              enableRuledLine={enableRuledLine}
                              rowSpan={calculateRowSpan(
                                displayData,
                                index,
                                column,
                              )}
                            >
                              {column.renderCell ? (
                                column.renderCell(item)
                              ) : (
                                <Typography align={column.align}>
                                  {column.selector(item)}
                                </Typography>
                              )}
                            </Table.Cell>
                          ),
                        )}
                      </Table.Row>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      columns.length +
                      ((showCheckbox || showRadioButton) &&
                      (!showTabs || isCheckableTab(currentTabIndex, tabs))
                        ? 1
                        : 0)
                    }
                  >
                    <ItemEmpty {...itemEmptyProps} />
                  </td>
                </tr>
              )}
            </Table.Body>
          </Table>
        </Styled.TableContainer>
      </Styled.BorderContainer>
      {enablePagination && (
        <Spacer p={3}>
          <Flex
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Pager
              per={filterState.per}
              total={totalLength}
              index={filterState.index}
              onClick={handlePagerChange}
            />
            <CountChanger
              per={filterState.per}
              total={totalLength}
              index={filterState.index}
              labelRowsPerPage={labelRowsPerPage}
              labelDisplayedRows={labelDisplayedRows}
              onChange={handleCountChange}
            />
          </Flex>
        </Spacer>
      )}
    </Styled.Container>
  );
};

// FIXME: Imprement without type assertion
export default React.forwardRef(DataTable) as <T>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof DataTable>;
