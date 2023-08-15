import { Dayjs } from "dayjs";
import React, { FC, memo, ReactNode } from "react";
import { DayStyle, DayBetween, DayEnd, DayStart } from "./styled";

type Props = {
  state: "start" | "end" | "between" | "none";
  value: Dayjs;
  onClickDate?: (value: Dayjs) => void;
  children: ReactNode;
};

export const Day: FC<Props> = memo(
  ({ state, value, onClickDate, children }) => {
    const onClick = () => {
      onClickDate?.(value);
    };

    switch (state) {
      case "start":
        return <DayStart onClick={onClick}>{children}</DayStart>;
      case "end":
        return <DayEnd onClick={onClick}>{children}</DayEnd>;
      case "between":
        return <DayBetween onClick={onClick}>{children}</DayBetween>;
      default:
        return <DayStyle onClick={onClick}>{children}</DayStyle>;
    }
  },
);
