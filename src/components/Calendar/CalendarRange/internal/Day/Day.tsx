import { Dayjs } from "dayjs";
import React, { FC, memo, ReactNode } from "react";
import { DayStyle, DayBetween, DayEnd, DayStart } from "./styled";
import { DayState, DayStateType } from "../../constants";

type Props = {
  state: DayStateType;
  value: Dayjs | null;
  onClickDate?: (value: Dayjs | null) => void;
  children: ReactNode;
};

export const Day: FC<Props> = memo(
  ({ state, value, onClickDate, children }) => {
    const onClick = () => {
      onClickDate?.(value);
    };

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
  },
);
