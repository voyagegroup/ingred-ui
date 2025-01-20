import { Dayjs } from "dayjs";
import React, { FC, memo, ReactNode } from "react";
import { DayContainer, DisableDayContainer } from "./styled";

type Props = {
  selected: boolean;
  selectable: boolean;
  value: Dayjs;
  onClickDate?: (newDate: Dayjs) => void;
  children: ReactNode;
};

export const Day: FC<Props> = memo(function Day({
  selected,
  value,
  selectable,
  onClickDate,
  children,
}) {
  const handleClick = () => {
    onClickDate?.(value);
  };

  return selectable ? (
    <DayContainer type="button" selected={selected} onClick={handleClick}>
      {children}
    </DayContainer>
  ) : (
    <DisableDayContainer type="button">{children}</DisableDayContainer>
  );
});
