import * as React from "react";
import * as Styled from "./styled";
import Menu, { MenuProps } from "../Menu";
import Icon from "../Icon";
import Input from "../Input";
import { useTheme } from "../../themes";
import Badge from "../Badge";
import Popover from "../Popover";
import { FilterCard } from "./internal/FilterCard";

export type MenuCloseReason = "clickCloseIcon" | "backdropClick";

export type MultipleFilterProps = {
  menuMaxHeight?: MenuProps["maxHeight"];
  // TODO: ここでfilterの条件を受け取る
};

const MultipleFilter: React.FunctionComponent<MultipleFilterProps> = ({
  menuMaxHeight = "none",
}) => {
  // step1: filter選択, step2: filter詳細決定
  // TODO: stepをunion型にする
  const [step, setStep] = React.useState<number>(0);
  const [selectedFilter, setSelectedFilter] = React.useState<any>(null);
  const theme = useTheme();
  const [inputElement, setInputElement] = React.useState<
    HTMLTextAreaElement | HTMLInputElement | null
  >(null);

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
    setStep(1);
  };

  // TODO: 条件のオブジェクトの形式を考える
  const handleSlect = (elem: any) => () => {
    setSelectedFilter(elem.name);
    setStep(2);
  };

  const handleClose = () => {
    setStep(0);
    setSelectedFilter(null);
  };

  const handleMenuClose = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: "backdropClick" | "clickMenuList",
  ) => {
    switch (reason) {
      case "backdropClick":
        setSelectedFilter(null);
        setStep(0);
        break;
      case "clickMenuList":
        setStep(2);
        break;
    }
  };

  const handleApply = () => {
    /*
      TODO: filterを追加する処理
    */
    setSelectedFilter(null);
    setStep(0);
  };

  return (
    <div>
      <Styled.Container isFocused={step !== 0}>
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
              onClick: handleSlect(elem),
              text: elem.name,
            }))}
            isOpen={step === 1}
            baseElement={inputElement}
            maxHeight={menuMaxHeight}
            onClose={handleMenuClose}
          />
        </Styled.RightContainer>
      </Styled.Container>
      {step === 2 && (
        <Popover
          isOpen={step === 2}
          baseElement={inputElement}
          onClose={handleClose}
        >
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
