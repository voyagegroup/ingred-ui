import { Dayjs } from "dayjs";
import React, { FC, memo, ReactNode } from "react";
import {
  DayStyle,
  DayBetween,
  DayEnd,
  DayStart,
  DisableDayContainer,
  DayContainer,
} from "./styled";
import { DayState, DayStateType } from "../../constants";

type Props = {
  state: DayStateType;
  value: Dayjs;
  selectable: boolean;
  onClickDate?: (value: Dayjs) => void;
  children: ReactNode;
};

const getDayStyle = ({
  state,
  value,
  selectable,
  onClickDate,
  children,
}: Props) => {
  const onClick = () => {
    onClickDate?.(value);
  };

  if (!selectable) {
    return <DisableDayContainer>{children}</DisableDayContainer>;
  }

  switch (state) {
    case DayState.START:
      return <DayStart onClick={onClick}>{children}</DayStart>;
    case DayState.END:
      return <DayEnd onClick={onClick}>{children}</DayEnd>;
    case DayState.BETWEEN:
      return <DayBetween onClick={onClick}>{children}</DayBetween>;
    default:
      return <DayStyle onClick={onClick}>{children}</DayStyle>;
  }
};

export const Day: FC<Props> = memo(function Day({
  state,
  value,
  selectable,
  onClickDate,
  children,
}) {
  return (
    <DayContainer>
      {getDayStyle({ state, value, selectable, onClickDate, children })}
    </DayContainer>
  );
});
