import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Month, MonthContainer, YearContainer } from "./styled";
import { useScrollYearMonths } from "../../hooks/useScrollYearMonths";
import { Icon, ScrollArea, Typography } from "../../..";
import { CalendarMonth, DatePickerContainer, IconButton } from "../../styled";
import { useTheme } from "../../../../themes";

type Props = {
  date: Dayjs;
  current: Dayjs;
  yearIsOpen: boolean;
  onYearIsOpen: (yearIsOpen: boolean) => void;
  onClick: (date: Dayjs) => void;
};

export const YearMonths: React.FC<Props> = ({
  date,
  current,
  yearIsOpen,
  onYearIsOpen,
  onClick,
}) => {
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const { years } = useScrollYearMonths(current, ref);

  const handleClick = (year: number, month: number) => {
    const newDate = dayjs(`${year}-${month}-01`);
    onClick(newDate);
  };

  return (
    <DatePickerContainer id="year">
      <CalendarMonth>
        <Typography color="transparent" size="xl">
          {date.format("YYYY年MM月")}
        </Typography>
        <IconButton
          expanded={yearIsOpen}
          onClick={() => onYearIsOpen(!yearIsOpen)}
        >
          <Icon name="arrow_bottom" size="lg" color={theme.palette.black} />
        </IconButton>
      </CalendarMonth>
      <ScrollArea
        ref={ref}
        maxHeight="400px"
        minHeight="400px"
        id="year-months"
      >
        <>
          {years.map((year) => {
            const months = Array.from(new Array(12), (_, i) => i + 1);
            return (
              <div key={year} className={`${year}`}>
                <YearContainer weight="bold" size="xl">
                  {year}年
                </YearContainer>
                <MonthContainer>
                  {months.map((month) => {
                    return (
                      <Month
                        key={month}
                        onClick={() => handleClick(year, month)}
                      >
                        {month}月
                      </Month>
                    );
                  })}
                </MonthContainer>
              </div>
            );
          })}
        </>
      </ScrollArea>
    </DatePickerContainer>
  );
};
