import * as React from "react";
import * as Styled from "./styled";
import Menu, { MenuProps } from "../Menu";
import Icon from "../Icon";
import Input from "../Input";
import { useTheme } from "../../themes";
import Popover from "../Popover";
import { FilterCard } from "./internal/FilterCard";
import { Status, getCurrentStatus } from "./MultipleFilterStatus";
import { Label } from "./internal/Label";
import { CloseButton } from "./internal/CloseButton";
import { FilterPackType, ReferedFilterType } from "./types";
import { ContentProp } from "../MenuList/MenuList";

export type MultipleFilterProps = {
  menuMaxHeight?: MenuProps["maxHeight"];
  filterPacks?: FilterPackType[];
  onChange?: (referedFilters: ReferedFilterType[]) => void;
};

const MultipleFilter: React.FunctionComponent<MultipleFilterProps> = ({
  menuMaxHeight = "none",
  filterPacks,
  onChange,
}) => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [
    selectedFilter,
    setSelectedFilter,
  ] = React.useState<FilterPackType | null>(null);
  const theme = useTheme();
  const [inputElement, setInputElement] = React.useState<
    HTMLTextAreaElement | HTMLInputElement | null
  >(null);
  const currentStatus = getCurrentStatus(isFocus, selectedFilter);
  const [currentReferedFilters, setCurrentReferedFilters] = React.useState<
    ReferedFilterType[]
  >([]);

  const handleOnFocus = () => {
    setIsFocus(true);
  };

  const handleSelect = (elem: FilterPackType) => () => {
    setSelectedFilter(elem);
  };

  const handleClose = () => {
    setSelectedFilter(null);
    setIsFocus(false);
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
    setSelectedFilter(null);
    setIsFocus(false);
  };

  const handleRemove = (removedFilter: ReferedFilterType) => {
    const newReferedFilters = currentReferedFilters.filter(
      (referedFilter) => referedFilter.filterName !== removedFilter.filterName,
    );
    if (onChange !== undefined) {
      onChange(newReferedFilters);
    }
    setCurrentReferedFilters(newReferedFilters);
  };

  const handleClear = () => {
    if (onChange !== undefined) {
      onChange([]);
    }
    setCurrentReferedFilters([]);
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
                  <Label filter={referedFilter} onRemove={handleRemove} />
                </Styled.LabelContainer>
              );
            })}

            <Input
              ref={setInputElement}
              type="text"
              placeholder="新しいフィルタを追加"
              onFocus={handleOnFocus}
            />
          </Styled.InputContiner>
          {currentStatus === Status.FilterSelecting && (
            <Popover baseElement={inputElement}>
              <Menu
                contents={
                  filterPacks?.map((filterOption) => ({
                    onClick: handleSelect(filterOption),
                    text: filterOption.categoryName,
                  })) as ContentProp[]
                }
                baseElement={inputElement}
                maxHeight={menuMaxHeight}
                onClose={handleMenuClose}
              />
            </Popover>
          )}
        </Styled.CenterContainer>
        <Styled.RightContainer>
          <CloseButton onClick={handleClear} />
        </Styled.RightContainer>
      </Styled.Container>

      {currentStatus === Status.ConditionSelecting && (
        <Popover
          baseElement={inputElement}
          positionPriority={["bottom-start"]}
          onClose={handleClose}
        >
          <FilterCard
            currentReferedFilters={currentReferedFilters}
            selectedFilterPack={filterPacks?.find(
              (filterOption) =>
                filterOption.categoryName === selectedFilter?.categoryName,
            )}
            onApply={handleApply}
            onClose={handleClose}
          />
        </Popover>
      )}
    </div>
  );
};

export default MultipleFilter;
