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
import { FilterPackType, ReferredFilterType } from "./types";
import { ContentProp } from "../MenuList/MenuList";
import { useLocaleProps } from "../../hooks/useLocaleProps";

export type MultipleFilterProps = {
  /**
   * `type FilterPackType = {
   *   categoryName: string;
   *   filters: FilterType[];
   *  }`
   */
  filterPacks?: FilterPackType[];

  /**
   * `type ReferredFilterType = {
   *   categoryName: string;
   *   filterName: string;
   *   filterType: Types;
   *   filterCondition: ControlType<Types>["options"];
   *  }`
   */
  onChange?: (referredFilters: ReferredFilterType[]) => void;
  placeholder?: string;
  editButtonTitle?: string;
  applyButtonTitle?: string;
  inputErrorText?: string;
  formPlaceholder?: string;
  width?: string;
};

const MultipleFilter = React.forwardRef<HTMLDivElement, MultipleFilterProps>(
  function MultipleFilter(inProps, ref) {
    const props = useLocaleProps({ props: inProps, name: "MultipleFilter" });
    const {
      filterPacks,
      onChange,
      placeholder = "Add a new filter",
      editButtonTitle,
      applyButtonTitle,
      inputErrorText,
      formPlaceholder,
      width,
    } = props;

    const [isClick, setIsClick] = React.useState<boolean>(false);
    const [selectedFilterPack, setSelectedFilterPack] =
      React.useState<FilterPackType | null>(null);
    const theme = useTheme();
    const [inputElement, setInputElement] = React.useState<
      HTMLTextAreaElement | HTMLInputElement | null
    >(null);
    const [editingLabelElement, setEditingLabelElement] =
      React.useState<HTMLDivElement | null>(null);
    const [willEditFilter, setWillEditFilter] =
      React.useState<ReferredFilterType | null>(null);
    const currentStatus = getCurrentStatus(
      isClick,
      selectedFilterPack,
      willEditFilter,
    );
    const [currentReferredFilters, setCurrentReferredFilters] = React.useState<
      ReferredFilterType[]
    >([]);

    const handleOnClick = () => {
      setIsClick(true);
    };

    const handleSelect = (elem: FilterPackType) => () => {
      setSelectedFilterPack(elem);
    };

    const handleClose = () => {
      setSelectedFilterPack(null);
      setIsClick(false);
      setWillEditFilter(null);
    };

    const handleMenuClose = (
      _: React.MouseEvent<HTMLDivElement, MouseEvent>,
      reason: "backdropClick" | "clickMenuList",
    ) => {
      if (reason === "backdropClick") {
        setIsClick(false);
      }
    };

    const handleApply = (newReferredFilter: ReferredFilterType) => {
      const newReferredFilters = currentReferredFilters.concat([
        newReferredFilter,
      ]);
      setCurrentReferredFilters(newReferredFilters);
      if (onChange !== undefined) {
        onChange(newReferredFilters);
      }

      setSelectedFilterPack(null);
      setIsClick(false);
    };

    const handleRemove = (removedFilter: ReferredFilterType) => {
      const newReferredFilters = currentReferredFilters.filter(
        (referredFilter) =>
          referredFilter.filterName !== removedFilter.filterName,
      );
      setCurrentReferredFilters(newReferredFilters);
      if (onChange !== undefined) {
        onChange(newReferredFilters);
      }
    };

    const handleClear = () => {
      setCurrentReferredFilters([]);
      if (onChange !== undefined) {
        onChange([]);
      }
    };

    const hasReferredFilter = (referredFilters: ReferredFilterType[]) => {
      return referredFilters.length !== 0;
    };

    const handleLabelClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      referredFilter: ReferredFilterType,
    ) => {
      const willEditFilterPack = filterPacks?.find(
        (filterPack) => filterPack.categoryName === referredFilter.categoryName,
      );
      if (willEditFilterPack) {
        if (willEditFilterPack.filters.length === 1) {
          willEditFilterPack.filters[0].filterName =
            willEditFilterPack.categoryName;
        }
        setEditingLabelElement(event.currentTarget);
        setIsClick(true);
        setSelectedFilterPack(willEditFilterPack);
        setWillEditFilter(referredFilter);
      }
    };

    const handleEdit = (editedFilter: ReferredFilterType) => {
      const editIndex = currentReferredFilters.findIndex(
        (referredFilter) =>
          referredFilter.filterName === editedFilter.filterName,
      );

      const isEdited =
        currentReferredFilters[editIndex].filterCondition !==
        editedFilter.filterCondition;

      if (isEdited) {
        const newReferredFilters = currentReferredFilters.slice();
        newReferredFilters[editIndex] = editedFilter;

        setCurrentReferredFilters(newReferredFilters);

        if (onChange !== undefined) {
          onChange(newReferredFilters);
        }
      }

      setIsClick(false);
      setSelectedFilterPack(null);
      setWillEditFilter(null);
    };

    const getMenuOption = () => {
      return filterPacks
        ?.filter(
          (filterPack) =>
            filterPack.filters.length !==
            currentReferredFilters.filter(
              (referredFilter) =>
                referredFilter.categoryName === filterPack.categoryName,
            ).length,
        )
        .map((filterOption) => ({
          onClick: handleSelect(filterOption),
          text: filterOption.categoryName,
        })) as ContentProp[];
    };

    return (
      <>
        <Styled.Container ref={ref} isFocused={currentStatus !== Status.Empty}>
          <Styled.LeftContainer>
            <Icon name="search" size="md" color={theme.palette.gray.dark} />
          </Styled.LeftContainer>
          <Styled.CenterContainer>
            <Styled.InputContainer>
              {currentReferredFilters.map((referredFilter) => {
                return (
                  <Styled.LabelContainer key={referredFilter.filterName}>
                    <Label
                      filter={referredFilter}
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
                placeholder={placeholder}
                onClick={handleOnClick}
              />
            </Styled.InputContainer>
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
            {hasReferredFilter(currentReferredFilters) && (
              <Styled.IconContainer onClick={handleClear}>
                <Icon
                  name="close_circle"
                  color={theme.palette.black}
                  type="fill"
                />
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
              currentReferredFilters={currentReferredFilters}
              selectedFilterPack={filterPacks?.find(
                (filterPack) =>
                  filterPack.categoryName === selectedFilterPack?.categoryName,
              )}
              inputErrorText={inputErrorText}
              formPlaceholder={formPlaceholder}
              width={width}
              onApply={handleApply}
              onClose={handleClose}
            />
          </Popover>
        )}
        {currentStatus === Status.ConditionEditing && (
          <Popover
            baseElement={editingLabelElement}
            positionPriority={["bottom-start"]}
            onClose={handleClose}
          >
            <EditFilterCard
              editButtonTitle={editButtonTitle}
              willEditFilter={willEditFilter as ReferredFilterType}
              selectedFilterPack={filterPacks?.find(
                (filterPack) =>
                  filterPack.categoryName === willEditFilter?.categoryName,
              )}
              inputErrorText={inputErrorText}
              formPlaceholder={formPlaceholder}
              width={width}
              onEdit={handleEdit}
              onClose={handleClose}
            />
          </Popover>
        )}
      </>
    );
  },
);

export default MultipleFilter;
