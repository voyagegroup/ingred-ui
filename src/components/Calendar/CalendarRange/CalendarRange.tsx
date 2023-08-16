import dayjs, { Dayjs } from "dayjs";
import { Card, Icon, ScrollArea, Typography } from "../..";
import React, { forwardRef, memo, useCallback, useRef, useState } from "react";
import { Day } from "./internal/Day";
import { HEIGHT, weekList } from "../constants";
import {
  CalendarContainer,
  CalendarMonth,
  Container,
  DatePickerContainer,
  DayStyle,
  IconContainer,
} from "../styled";
import { useScroll } from "../hooks/useScroll";
import { getDayState } from "./utils";
import { Action, Actions } from "../internal/Actions";
import { ClickState, ClickStateType } from "./types";

export type CalendarRangeProps = {
  startDate: Dayjs;
  endDate: Dayjs;
  actions?: Action[];
  /**
   * 親コンポーネントで calendar を任意のタイミングで閉じたい場合に使用する
   */
  onClose?: (clickState: ClickStateType) => void;
  /**
   * 閉じるボタンを押したときの振る舞い
   * この関数が渡されてないときは、閉じるボタンが表示されない
   */
  onClickCloseButton?: () => void;
  onDatesChange: ({
    startDate,
    endDate,
  }: {
    startDate: Dayjs;
    endDate: Dayjs;
  }) => void;
};

/**
 * CalendarRange
 * Scrollable calendar UI.
 * Currently, one year from the currently selected date is displayed.
 */
export const CalendarRange = forwardRef<HTMLDivElement, CalendarRangeProps>(
  function (
    { startDate, endDate, actions, onClose, onClickCloseButton, onDatesChange },
    ref,
  ) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { monthList } = useScroll(startDate ?? dayjs(), scrollRef);
    const [clickState, setClickState] = useState<ClickStateType>(
      ClickState.START,
    );

    const handleDateChange = useCallback(
      (value: Dayjs) => {
        onClose && onClose(clickState);
        switch (clickState) {
          case ClickState.START:
            onDatesChange?.({
              startDate: value,
              endDate,
            });
            setClickState(ClickState.END);
            break;
          case ClickState.END:
            onDatesChange?.({
              startDate,
              endDate: value,
            });
            setClickState(ClickState.START);
            break;
          // Maybe, I will add other state.
          default:
            break;
        }
      },
      [onClose, clickState, onDatesChange, endDate, startDate],
    );

    return (
      <Card ref={ref} display="flex" width="fit-content">
        <Actions actions={actions} />
        <Container>
          <ScrollArea
            ref={scrollRef}
            minHeight={HEIGHT}
            maxHeight={HEIGHT}
            id="calendar"
          >
            <>
              {monthList.map((m) => (
                <DatePickerContainer
                  key={m.format("YYYY-MM")}
                  id={m.format("YYYY-MM")}
                  className={m.format("YYYY-MM")}
                >
                  <CalendarMonth>
                    <Typography weight="bold" size="xl">
                      {m.format("YYYY年MM月")}
                    </Typography>
                  </CalendarMonth>
                  <CalendarContainer>
                    {weekList["ja"].map((week) => (
                      <DayStyle key={week}>{week}</DayStyle>
                    ))}
                    {Array.from(new Array(m.startOf("month").day()), (_, i) => (
                      <DayStyle key={i} />
                    ))}
                    {Array.from(
                      new Array(m.daysInMonth()),
                      (_, i) => i + 1,
                    ).map((day) => (
                      <div
                        key={day}
                        style={{
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <Day
                          value={dayjs(new Date(m.year(), m.month(), day))}
                          state={getDayState(startDate, endDate, m, day)}
                          onClickDate={handleDateChange}
                        >
                          {day}
                        </Day>
                      </div>
                    ))}
                  </CalendarContainer>
                </DatePickerContainer>
              ))}
            </>
          </ScrollArea>
        </Container>
        {onClickCloseButton && (
          <IconContainer onClick={onClickCloseButton}>
            <Icon name="close" />
          </IconContainer>
        )}
      </Card>
    );
  },
);

export default memo(CalendarRange);
