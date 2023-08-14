import { Dayjs } from "dayjs";
import React, { FC, memo, ReactNode } from "react";
import { DayContainer } from "./styled";

type Props = {
  selected: boolean;
  value: Dayjs;
  onClickDate?: (newDate: Dayjs) => void;
  children: ReactNode;
};

export const Day: FC<Props> = memo(
  ({ selected, value, onClickDate, children }) => (
    <DayContainer
      selected={selected}
      onClick={() => {
        onClickDate?.(value);
      }}
    >
      {children}
    </DayContainer>
  ),
);
