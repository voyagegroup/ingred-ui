import * as React from "react";
import * as Styled from "./styled";
import { NumberButton } from "../NumberButton";

const getCenterIndex = (pagerCount: number, index: number): number => {
  switch (true) {
    case index < 4:
      return 3;
    case pagerCount - 3 < index:
      return pagerCount - 2;
    default:
      return index;
  }
};

const getCenterIndexes = (
  centerIndex: number,
  pagerCount: number,
): number[] => {
  switch (centerIndex) {
    case 3:
      return [centerIndex - 1, centerIndex, centerIndex + 1, centerIndex + 2];
    case pagerCount - 2:
      return [centerIndex - 2, centerIndex - 1, centerIndex, centerIndex + 1];
    default:
      return [centerIndex - 1, centerIndex, centerIndex + 1];
  }
};

const ThreeDottedLine = () => (
  <Styled.ThreeDotsWrapper>...</Styled.ThreeDotsWrapper>
);

type Props = {
  pagerCount: number;
  index: number;
  onClick: (index: number) => void;
};

export const PagerButtonsWithDottedLine: React.FunctionComponent<Props> = ({
  pagerCount,
  index,
  onClick,
}) => {
  const centerIndex = getCenterIndex(pagerCount, index);
  const handleClick = (index: number) => () => onClick(index);
  return (
    <>
      <NumberButton
        index={1}
        isActiveIndex={index === 1}
        onClick={handleClick(1)}
      />
      {centerIndex !== 3 && <ThreeDottedLine />}
      {getCenterIndexes(centerIndex, pagerCount).map((i) => (
        <NumberButton
          key={i}
          index={i}
          isActiveIndex={index === i}
          onClick={handleClick(i)}
        />
      ))}
      {centerIndex !== pagerCount - 2 && <ThreeDottedLine />}
      <NumberButton
        index={pagerCount}
        isActiveIndex={index === pagerCount}
        onClick={handleClick(pagerCount)}
      />
    </>
  );
};
