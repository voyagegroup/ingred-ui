import * as React from "react";
import * as Styled from "./styled";
import Menu, { MenuProps } from "../Menu";
import Icon from "../Icon";
import Input from "../Input";
import { useTheme } from "../../themes";
import Badge from "../Badge";
import Popover from "../Popover";
import { FilterCard } from "./internal/FilterCard";
import { Status, getCurrentStatus } from "./MultipleFilterStatus";

export type MultipleFilterProps = {
  menuMaxHeight?: MenuProps["maxHeight"];
  // TODO: ここでfilterの条件を受け取る
};

const MultipleFilter: React.FunctionComponent<MultipleFilterProps> = ({
  menuMaxHeight = "none",
}) => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = React.useState<any>(null);
  const theme = useTheme();
  const [inputElement, setInputElement] = React.useState<
    HTMLTextAreaElement | HTMLInputElement | null
  >(null);
  const currentStatus = getCurrentStatus(isFocus, selectedFilter);

  //////////////////
  // For render  //

  // TODO: 条件のオブジェクトの形式を考える
  const filterExample = [
    { name: "成人", condition: true },
    { name: "血液型", condition: "AB型" },
    { name: "身長170cm未満", condition: true },
    { name: "生年月日", condition: "6月" },
    { name: "体重", condition: "60 ~ 70" },
  ];
  // For render   //
  /////////////////

  const handleOnFocus = () => {
    setIsFocus(true);
  };

  // TODO: 条件のオブジェクトの形式を考える
  const handleSelect = (elem: any) => () => {
    setSelectedFilter(elem.name);
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

  const handleApply = () => {
    /*
      TODO: filterを追加する処理
    */
    setSelectedFilter(null);
    setIsFocus(false);
  };

  return (
    <div>
      <Styled.Container isFocused={currentStatus !== Status.Empty}>
        <Styled.LeftContainer>
          <Icon name="filter" size="md" color={theme.palette.gray.dark} />
        </Styled.LeftContainer>
        <Styled.RightContainer>
          <Styled.InputContiner>
            {/* TODO: filterを保持できるようにする */}
            {/* TODO: Badgeを使わないようにする */}
            {filterExample.map((filter) => {
              return (
                <Badge key={filter.name} color="secondary" type="pill">
                  {filter.name} | {String(filter.condition)}
                </Badge>
              );
            })}

            <Input
              ref={setInputElement}
              type="text"
              placeholder="新しいフィルタを追加"
              onFocus={handleOnFocus}
            />
          </Styled.InputContiner>
          <Menu
            contents={filterExample.map((elem) => ({
              onClick: handleSelect(elem),
              text: elem.name,
            }))}
            isOpen={currentStatus === Status.FilterSelecting}
            baseElement={inputElement}
            maxHeight={menuMaxHeight}
            onClose={handleMenuClose}
          />
        </Styled.RightContainer>
      </Styled.Container>

      {currentStatus === Status.ConditionSelecting && (
        <Popover baseElement={inputElement} onClose={handleClose}>
          <FilterCard
            selectedFilter={selectedFilter}
            onSubmit={handleApply}
            onClose={handleClose}
          />
        </Popover>
      )}
    </div>
  );
};

export default MultipleFilter;
