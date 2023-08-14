import dayjs, { Dayjs } from "dayjs";
import { Card, ScrollArea, Typography } from "..";
import React, { forwardRef, memo, useRef } from "react";
import { Day } from "./internal/Day";
import { weekList, HEIGHT } from "./constants";
import {
  Container,
  CalendarContainer,
  DatePickerContainer,
  DayStyle,
  CalendarMonth,
} from "./styled";
import { useScroll } from "./hooks/useScroll";
import { Action, Actions } from "./internal/Actions";

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  date: Dayjs;
  actions?: Action[];
  onDateChange: (value: Dayjs) => void;
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { date, actions, onDateChange, ...rest },
  ref,
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { monthList } = useScroll(date, scrollRef);

  return (
    <Card ref={ref} display="flex" style={{ width: "fit-content" }} {...rest}>
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
                {/* 年月の表示 */}
                <CalendarMonth>
                  <Typography weight="bold" size="xl">
                    {m.format("YYYY年MM月")}
                  </Typography>
                </CalendarMonth>

                {/* カレンダーの表示 */}
                <CalendarContainer>
                  {/* 曜日の表示 */}
                  {weekList["ja"].map((week) => (
                    <DayStyle key={week}>{week}</DayStyle>
                  ))}

                  {/* 開始曜日まで空白をセット */}
                  {Array.from(new Array(m.startOf("month").day()), (_, i) => (
                    <DayStyle key={i} />
                  ))}

                  {/* 日付の表示 */}
                  {Array.from(new Array(m.daysInMonth()), (_, i) => i + 1).map(
                    (day) => (
                      <Day
                        key={day}
                        value={dayjs(new Date(m.year(), m.month(), day))}
                        // ややこしいけど、ここでのselectedは、選択中の日付かどうかを判定している
                        // つまり、選択中の日付の場合はtrueになり、style で色を変える
                        selected={
                          date.format("YYYY-MM-DD") ===
                          dayjs(new Date(m.year(), m.month(), day)).format(
                            "YYYY-MM-DD",
                          )
                        }
                        onClickDate={onDateChange}
                      >
                        {day}
                      </Day>
                    ),
                  )}
                </CalendarContainer>
              </DatePickerContainer>
            ))}
          </>
        </ScrollArea>
      </Container>
    </Card>
  );
});

export default memo(Calendar);
