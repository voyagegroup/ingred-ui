import React, { useRef } from "react";
import { HEIGHT } from "../../constants";
import { useTheme } from "../../../../themes";
import { useScrollCalendar } from "../../hooks/useScrollCalendar";
import { Icon, ScrollArea } from "../../../";
import dayjs, { Dayjs } from "dayjs";
import { getDayState } from "../../CalendarRange/utils";
import {
  CalendarContainer,
  CalendarMonth,
  DatePickerContainer,
  DayStyle,
  IconButton,
  TitleContainer,
} from "../../styled";
import { Day } from "../../CalendarRange/internal/Day";

type Props = {
  startDate: Dayjs;
  endDate: Dayjs;
  monthFormat?: string;
  weekList?: string[];
  current: Dayjs;
  yearIsOpen: boolean;
  onYearIsOpen: (yearIsOpen: boolean) => void;
  isOutsideRange: (date: Dayjs) => boolean;
  onDateChange: (value: Dayjs) => void;
};

export const InnerCalendarRange: React.FC<Props> = ({
  startDate,
  endDate,
  monthFormat,
  weekList,
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
      <div>
        {monthList.map((m) => (
          <DatePickerContainer
            key={m.format("YYYY-MM")}
            id={m.format("YYYY-MM")}
            className={m.format("YYYY-MM")}
          >
            <CalendarMonth expanded={yearIsOpen}>
              <TitleContainer expanded={yearIsOpen} weight="bold" size="xl">
                {m.format(monthFormat)}
              </TitleContainer>
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
            <CalendarContainer>
              {weekList?.map((week) => <DayStyle key={week}>{week}</DayStyle>)}
              {Array.from(new Array(m.startOf("month").day()), (_, i) => (
                <DayStyle key={i} />
              ))}
              {Array.from(new Array(m.daysInMonth()), (_, i) => i + 1).map(
                (day) => {
                  const selectable = !isOutsideRange(
                    dayjs(new Date(m.year(), m.month(), day)),
                  );

                  return (
                    <Day
                      key={day}
                      value={dayjs(new Date(m.year(), m.month(), day))}
                      state={getDayState(startDate, endDate, m, day)}
                      selectable={selectable}
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
      </div>
    </ScrollArea>
  );
};
