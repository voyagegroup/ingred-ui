import React, { useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Icon, ScrollArea, Typography } from "../../..";
import { useTheme } from "styled-components";
import { useScrollCalendar } from "../../hooks/useScrollCalendar";
import { HEIGHT, weekList } from "../../constants";
import {
  CalendarContainer,
  CalendarMonth,
  DatePickerContainer,
  DayStyle,
  IconButton,
} from "../../styled";
import { Day } from "../../Calendar/internal/Day";

type Props = {
  date: Dayjs;
  current: Dayjs;
  yearIsOpen: boolean;
  onYearIsOpen: (yearIsOpen: boolean) => void;
  isOutsideRange: (date: Dayjs) => boolean;
  onDateChange: (value: Dayjs) => void;
};
export const InnerCalendar: React.FC<Props> = ({
  date,
  current,
  yearIsOpen,
  onYearIsOpen,
  isOutsideRange,
  onDateChange,
}) => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { monthList } = useScrollCalendar(current, scrollRef);

  return (
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
              <IconButton
                expanded={yearIsOpen}
                onClick={() => onYearIsOpen(!yearIsOpen)}
              >
                <Icon
                  name="arrow_bottom"
                  size="lg"
                  color={theme.palette.black}
                />
              </IconButton>
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
                (day) => {
                  // ややこしいけど、ここでのselectedは、選択中の日付かどうかを判定している
                  // つまり、選択中の日付の場合はtrueになり、style で色を変える
                  const selected =
                    date.format("YYYY-MM-DD") ===
                    dayjs(new Date(m.year(), m.month(), day)).format(
                      "YYYY-MM-DD",
                    );

                  const selectable = !isOutsideRange(
                    dayjs(new Date(m.year(), m.month(), day)),
                  );

                  return (
                    <Day
                      key={day}
                      value={dayjs(new Date(m.year(), m.month(), day))}
                      selectable={selectable}
                      selected={selected}
                      onClickDate={onDateChange}
                    >
                      {day}
                    </Day>
                  );
                },
              )}
            </CalendarContainer>
          </DatePickerContainer>
        ))}
      </>
    </ScrollArea>
  );
};
