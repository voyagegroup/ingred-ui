import dayjs, { Dayjs } from "dayjs";
import { Card, ScrollArea, Typography } from "../..";
import React, { forwardRef, memo, useCallback, useRef, useState } from "react";
import { Day } from "./internal/Day";
import { HEIGHT, weekList } from "../constants";
import {
  CalendarContainer,
  CalendarMonth,
  Container,
  DatePickerContainer,
  DayStyle,
} from "../styled";
import { useScroll } from "../hooks/useScroll";
import { getDayState } from "./utils";
import { Action, Actions } from "../internal/Actions";

export type CalendarRangeProps = {
  startDate: Dayjs;
  endDate: Dayjs;
  actions?: Action[];
  /**
   * date: { start: Dayjs; end: Dayjs; } にしたい
   * ここは少し考える
   */
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
 * @todo forwardRef
 */
export const CalendarRange = forwardRef<HTMLDivElement, CalendarRangeProps>(
  function ({ startDate, endDate, actions, onDatesChange }, ref) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { monthList } = useScroll(startDate ?? dayjs(), scrollRef);
    const [clickState, setClickState] = useState<"start" | "end">("start");

    const handleDateChange = useCallback(
      (value: Dayjs) => {
        switch (clickState) {
          case "start":
            onDatesChange?.({
              startDate: value,
              endDate,
            });
            setClickState("end");
            break;
          case "end":
            onDatesChange?.({
              startDate,
              endDate: value,
            });
            setClickState("start");
            break;
          // Maybe, I will add other state.
          default:
            break;
        }
      },
      [clickState, startDate, endDate, onDatesChange],
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
      </Card>
    );
  },
);

export default memo(CalendarRange);
