import * as React from "react";
import * as Styled from "./styled";
import { CountChanger } from "./internal/CountChanger";
import { SortableHeaderCell } from "./internal/SortableHeaderCell";
import { CellCheckbox } from "./internal/CellCheckbox";
import { CellRadio } from "./internal/CellRadio";
import { Table } from "./internal/Table";
import Typography, { Props as TypographyProps } from "../Typography";
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
import ItemEmpty from "../ItemEmpty";

import { StorageKey } from "../../constants/storageKeys";
import { TableTabs } from "./internal/TableTabs";
import { useDidUpdate } from "../../hooks/useDidUpdate";

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

function getDisplayData<T>({
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

export type Column<T> = {
  name: string;
  selector: (data: T) => string | number;
  sortable?: boolean;
  width?: string;
  renderCell?: (data: T) => React.ReactNode;
  align?: TypographyProps["align"];
};

type Tab<T> = {
  label: string;
  filter: (data: T[]) => T[];
  disabledCheck?: boolean;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  enablePagination?: boolean;
  onSelectRowsChange?: (rows: number[]) => void;
  onRadioChange?: (radio: number) => void;
  clearSelectedRows?: boolean;
  tabs?: Tab<T>[];
  tabWidth?: string; // tabsがある時のみ有効
  emptyTitle?: string;
  emptySubtitle?: string;
  per?: number; // perが指定されている場合、初期値がそれに強制されます
  defaultSortField?: string;
  defaultSortOrder?: "desc" | "asc";
  ruledLine?: boolean;
};

// idを必須にしたい
const DataTable = <T extends { id: number; selectDisabled?: boolean }>({
  data: sourceData,
  columns,
  enablePagination = false,
  onSelectRowsChange,
  onRadioChange,
  clearSelectedRows,
  tabs,
  tabWidth,
  emptyTitle,
  emptySubtitle,
  per,
  defaultSortField,
  defaultSortOrder = "desc",
  ruledLine = false,
}: Props<T>) => {
  const showCheckbox = !!onSelectRowsChange;
  const [allSelected, setAllSelected] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const indeterminate = selectedRows.length > 0 && !allSelected;

  const showRadioButton = !!onRadioChange;
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

  const showTabs = !!tabs;
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  let rowSpan = columns.length;
  if (
    (showCheckbox || showRadioButton) &&
    (!showTabs || isCheckableTab(currentTabIndex, tabs))
  ) {
    rowSpan = columns.length + 1;
  }

  // sort, pagination, count

  // 初回表示時にdefaultSortFieldがなければ一番左側のsortableなcolumnを基準にソートする
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

  // 検索などでpropsのdataが更新された場合は
  // もしくはcurrentTabIndexが更新された場合は
  // paginationを1に戻す
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

  // 選択項目のクリア
  React.useEffect(() => {
    if (clearSelectedRows) {
      setSelectedRows([]);
      if (onSelectRowsChange) {
        onSelectRowsChange([]);
      }
    }
  }, [clearSelectedRows, onSelectRowsChange]);

  // selectの変更をonSelectRowsChangeに伝える
  React.useEffect(() => {
    if (onSelectRowsChange) {
      onSelectRowsChange(selectedRows);
    }
  }, [selectedRows, onSelectRowsChange]);

  // radioの変更をonRadioChangeに伝える
  React.useEffect(() => {
    if (onRadioChange) {
      onRadioChange(selectedRow as number);
    }
  }, [selectedRow, onRadioChange]);

  const onHandleTabChange = (tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  const onHandleSort = (getValue: GetValue<T>, name: string) => () => {
    setSortState(changeOrderState<T>(sortState, getValue, name));
  };

  const onHandlePagerChange = (index: number) => {
    setFilterState({ index, per: filterState.per });
  };

  const onHandleCountChange = (per: number) => {
    setPerInLocalStorage(per);
    setFilterState({ index: 1, per });
  };

  const onHandleSelectCheckbox = (id: number) => () => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const onHandleSelectRadioButton = (id: number) => () => {
    setSelectedRow(id);
  };

  const onHandleToggleCheckAll = () => {
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
    <Styled.Container>
      {!!tabs && (
        <TableTabs
          width={tabWidth}
          value={currentTabIndex}
          items={tabs.map((tab, index) => ({
            label: tab.label,
            value: index,
          }))}
          onChange={onHandleTabChange}
        />
      )}
      <Table>
        <Table.Header>
          <Table.Row>
            {(!showTabs || isCheckableTab(currentTabIndex, tabs)) && (
              <>
                {showCheckbox && (
                  <CellCheckbox
                    header={true}
                    selected={selectedRows.length > 0}
                    indeterminate={indeterminate}
                    onClick={onHandleToggleCheckAll}
                  />
                )}
                {showRadioButton && <CellRadio header={true} />}
              </>
            )}
            {columns.map((column) => (
              <SortableHeaderCell
                key={column.name}
                sortable={column.sortable}
                order={getOrder(sortState, column.name)}
                width={column.width}
                ruledLine={ruledLine}
                onClick={
                  column.sortable
                    ? onHandleSort(column.selector, column.name)
                    : undefined
                }
              >
                {column.name}
              </SortableHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {displayData.length > 0 ? (
            displayData.map((item, index) => (
              <Table.Row
                key={index} // eslint-disable-line react/no-array-index-key
                highlighted={
                  !item.selectDisabled &&
                  (selectedRows.includes(item.id) || selectedRow === item.id)
                }
              >
                {(!showTabs || isCheckableTab(currentTabIndex, tabs)) && (
                  <>
                    {showCheckbox &&
                      (item.selectDisabled ? (
                        <Table.Cell ruledLine={ruledLine} />
                      ) : (
                        <CellCheckbox
                          selected={selectedRows.includes(item.id)}
                          onClick={onHandleSelectCheckbox(item.id)}
                        />
                      ))}
                    {showRadioButton && (
                      <CellRadio
                        selected={item.id === selectedRow}
                        onClick={onHandleSelectRadioButton(item.id)}
                      />
                    )}
                  </>
                )}
                {columns.map((column) => (
                  <Table.Cell key={column.name} ruledLine={ruledLine}>
                    {column.renderCell ? (
                      column.renderCell(item)
                    ) : (
                      <Typography align={column.align}>
                        {column.selector(item)}
                      </Typography>
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <tr>
              <td colSpan={rowSpan}>
                <ItemEmpty
                  title={emptyTitle || "見つかりませんでした"}
                  subtitle={emptySubtitle}
                />
              </td>
            </tr>
          )}
        </Table.Body>
      </Table>
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
              onClick={onHandlePagerChange}
            />
            <CountChanger
              per={filterState.per}
              total={totalLength}
              index={filterState.index}
              onChange={onHandleCountChange}
            />
          </Flex>
        </Spacer>
      )}
    </Styled.Container>
  );
};

export default DataTable;
