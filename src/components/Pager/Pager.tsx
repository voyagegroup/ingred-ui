import * as React from "react";

import { NumberButton } from "./internal/NumberButton";
import { ArrowButton } from "./internal/ArrowButton";
import { PagerButtonsWithDottedLine } from "./internal/PagerButtonsWithDottedLine";
import Flex from "../Flex";

export type PagerProps = {
  per: number;
  total: number;
  index?: number;
  onClick: (index: number) => void;
};

const Pager = React.forwardRef<HTMLDivElement, PagerProps>(
  ({ per, total, index = 1, onClick }, ref) => {
    const pagerCount = Math.ceil(total / per);
    const isFirst = index === 1 || total === 0;
    const isLast = index === pagerCount || total === 0;

    const handleClick = (index: number) => () => onClick(index);

    return (
      <Flex ref={ref} display="flex" alignItems="center">
        <ArrowButton
          isRight={false}
          disabled={isFirst}
          onClick={handleClick(index - 1)}
        />
        {pagerCount < 7 ? (
          [...Array(pagerCount)].map((_, i) => (
            <NumberButton
              key={i} // eslint-disable-line react/no-array-index-key
              index={i + 1}
              isActiveIndex={index === i + 1}
              onClick={handleClick(i + 1)}
            />
          ))
        ) : (
          <PagerButtonsWithDottedLine
            pagerCount={pagerCount}
            index={index}
            onClick={onClick}
          />
        )}
        <ArrowButton
          isRight
          disabled={isLast}
          onClick={handleClick(index + 1)}
        />
      </Flex>
    );
  },
);

export type FilterState = {
  per: number;
  index: number;
};

export function getFilteredItems<T>(items: T[], { per, index }: FilterState) {
  return items.slice((index - 1) * per, index * per);
}

export const useFilterState = (per = 10, index = 1) =>
  React.useState<FilterState>({ per, index });

export default Pager;
