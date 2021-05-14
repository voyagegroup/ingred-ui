import * as React from "react";
import * as Styled from "./styled";
import Menu from "../Menu";
import Icon from "../Icon";
import Input from "../Input";
import { useTheme } from "../../themes";
import Popover from "../Popover";
import { FilterCard } from "./internal/FilterCard";
import { EditFilterCard } from "./internal/EditFilterCard";
import { Status, getCurrentStatus } from "./MultipleFilterStatus";
import { Label } from "./internal/Label";
import { FilterPackType, ReferedFilterType } from "./types";
import { ContentProp } from "../MenuList/MenuList";

export type MultipleFilterProps = {
  /**
   * `type FilterPackType = {
   *   categoryName: string;
   *   filters: FilterType[];
    }`
   */
  filterPacks?: FilterPackType[];
  /**
   * `type ReferedFilterType = {
   *   categoryName: string;
   *   filterName: string;
   *   filterType: Types;
   *   filterCondtion: ControlType<Types>["options"];
    }`
   */
  onChange?: (referedFilters: ReferedFilterType[]) => void;
  sectionTitle?: string;
  conditionTitle?: string;
  placeholder?: string;
  editButtonTitle?: string;
  applyButtonTitle?: string;
};

const MultipleFilter: React.FunctionComponent<MultipleFilterProps> = ({
  filterPacks,
  onChange,
  sectionTitle,
  conditionTitle,
  placeholder,
  editButtonTitle,
  applyButtonTitle,
}) => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [
    selectedFilterPack,
    setSelectedFilterPack,
  ] = React.useState<FilterPackType | null>(null);
  const theme = useTheme();
  const [inputElement, setInputElement] = React.useState<
    HTMLTextAreaElement | HTMLInputElement | null
  >(null);
  const [
    edittingLabelElement,
    setEdittingLabelElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [
    willEditFilter,
    setWillEditFilter,
  ] = React.useState<ReferedFilterType | null>(null);
  const currentStatus = getCurrentStatus(
    isFocus,
    selectedFilterPack,
    willEditFilter,
  );
  const [currentReferedFilters, setCurrentReferedFilters] = React.useState<
    ReferedFilterType[]
  >([]);

  const handleOnFocus = () => {
    setIsFocus(true);
  };

  const handleSelect = (elem: FilterPackType) => () => {
    setSelectedFilterPack(elem);
  };

  const handleClose = () => {
    setSelectedFilterPack(null);
    setIsFocus(false);
    setWillEditFilter(null);
  };

  const handleMenuClose = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: "backdropClick" | "clickMenuList",
  ) => {
    if (reason === "backdropClick") {
      setIsFocus(false);
    }
  };

  const handleApply = (newReferedFilter: ReferedFilterType) => {
    const newReferedFilters = currentReferedFilters.concat([newReferedFilter]);
    setCurrentReferedFilters(newReferedFilters);
    if (onChange !== undefined) {
      onChange(newReferedFilters);
    }

    setSelectedFilterPack(null);
    setIsFocus(false);
  };

  const handleRemove = (removedFilter: ReferedFilterType) => {
    const newReferedFilters = currentReferedFilters.filter(
      (referedFilter) => referedFilter.filterName !== removedFilter.filterName,
    );
    setCurrentReferedFilters(newReferedFilters);
    if (onChange !== undefined) {
      onChange(newReferedFilters);
    }
  };

  const handleClear = () => {
    setCurrentReferedFilters([]);
    if (onChange !== undefined) {
      onChange([] as ReferedFilterType[]);
    }
  };

  const hasReferedFilter = (refoeredfilters: ReferedFilterType[]) => {
    return refoeredfilters.length !== 0;
  };

  const handleLabelClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    referedFilter: ReferedFilterType,
  ) => {
    const willEditFilterPack = filterPacks?.find(
      (filterPack) => filterPack.categoryName === referedFilter.categoryName,
    );
    if (willEditFilterPack) {
      setEdittingLabelElement(event.currentTarget);
      setIsFocus(true);
      setSelectedFilterPack(willEditFilterPack);
      setWillEditFilter(referedFilter);
    }
  };

  const handleEdit = (editedFilter: ReferedFilterType) => {
    const editIndex = currentReferedFilters.findIndex(
      (referedfilter) => referedfilter.filterName === editedFilter.filterName,
    );

    const isEdited =
      currentReferedFilters[editIndex].filterCondtion !==
      editedFilter.filterCondtion;

    if (isEdited) {
      currentReferedFilters[editIndex] = editedFilter;
      setCurrentReferedFilters(currentReferedFilters.slice());
      if (onChange !== undefined) {
        onChange(currentReferedFilters);
      }
    }

    setIsFocus(false);
    setWillEditFilter(null);
  };

  const getMenuOption = () => {
    return filterPacks
      ?.filter(
        (filterPack) =>
          filterPack.filters.length !==
          currentReferedFilters.filter(
            (referedFilter) =>
              referedFilter.categoryName === filterPack.categoryName,
          ).length,
      )
      .map((filterOption) => ({
        onClick: handleSelect(filterOption),
        text: filterOption.categoryName,
      })) as ContentProp[];
  };

  return (
    <div>
      <Styled.Container isFocused={currentStatus !== Status.Empty}>
        <Styled.LeftContainer>
          <Icon name="search" size="md" color={theme.palette.gray.dark} />
        </Styled.LeftContainer>
        <Styled.CenterContainer>
          <Styled.InputContiner>
            {currentReferedFilters.map((referedFilter) => {
              return (
                <Styled.LabelContainer key={referedFilter.filterName}>
                  <Label
                    filter={referedFilter}
                    onRemove={handleRemove}
                    onClick={handleLabelClick}
                  />
                </Styled.LabelContainer>
              );
            })}

            <Input
              ref={setInputElement}
              readOnly
              type="text"
              placeholder={placeholder ?? "Add a new filter"}
              onFocus={handleOnFocus}
            />
          </Styled.InputContiner>
          {currentStatus === Status.FilterSelecting && (
            <Popover baseElement={inputElement}>
              <Menu
                contents={getMenuOption()}
                baseElement={inputElement}
                onClose={handleMenuClose}
              />
            </Popover>
          )}
        </Styled.CenterContainer>
        <Styled.RightContainer>
          {hasReferedFilter(currentReferedFilters) && (
            <Styled.IconContainer onClick={handleClear}>
              <Icon name="close_circle" color={theme.palette.black} />
            </Styled.IconContainer>
          )}
        </Styled.RightContainer>
      </Styled.Container>

      {currentStatus === Status.ConditionSelecting && (
        <Popover
          baseElement={inputElement}
          positionPriority={["bottom-start"]}
          onClose={handleClose}
        >
          <FilterCard
            applyButtonTitle={applyButtonTitle}
            sectionTitle={sectionTitle}
            conditionTitle={conditionTitle}
            currentReferedFilters={currentReferedFilters}
            selectedFilterPack={filterPacks?.find(
              (filterPack) =>
                filterPack.categoryName === selectedFilterPack?.categoryName,
            )}
            onApply={handleApply}
            onClose={handleClose}
          />
        </Popover>
      )}
      {currentStatus === Status.ConditionEditting && (
        <Popover
          baseElement={edittingLabelElement}
          positionPriority={["bottom-start"]}
          onClose={handleClose}
        >
          <EditFilterCard
            editButtonTitle={editButtonTitle}
            sectionTitle={sectionTitle}
            conditionTitle={conditionTitle}
            willEditFilter={willEditFilter as ReferedFilterType}
            selectedFilterPack={filterPacks?.find(
              (filterPack) =>
                filterPack.categoryName === willEditFilter?.categoryName,
            )}
            onEdit={handleEdit}
            onClose={handleClose}
          />
        </Popover>
      )}
    </div>
  );
};

export default MultipleFilter;
