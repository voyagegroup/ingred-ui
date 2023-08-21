import React from "react";
import { StoryObj } from "@storybook/react";

import CalendarRange, { CalendarRangeProps } from "./CalendarRange";
import dayjs from "dayjs";

export default {
  title: "Components/Inputs/CalendarRange",
  components: CalendarRange,
};

export const Default: StoryObj<CalendarRangeProps> = {
  render: () => {
    const [date, setDate] = React.useState({
      startDate: dayjs(),
      endDate: dayjs().add(1, "week"),
    });

    const handleDatesChange = (date: {
      startDate: dayjs.Dayjs;
      endDate: dayjs.Dayjs;
    }) => {
      setDate(date);
    };

    return (
      <CalendarRange
        startDate={date.startDate}
        endDate={date.endDate}
        onDatesChange={handleDatesChange}
      />
    );
  },
};

export const WithActions: StoryObj<CalendarRangeProps> = {
  render: () => {
    const [date, setDate] = React.useState({
      startDate: dayjs(),
      endDate: dayjs().add(1, "week"),
    });

    const actions = [
      {
        text: "先週",
        onClick: () =>
          setDate({ startDate: dayjs().subtract(1, "week"), endDate: dayjs() }),
      },
      {
        text: "来週",
        onClick: () =>
          setDate({ startDate: dayjs(), endDate: dayjs().add(1, "week") }),
      },
      {
        text: "来月",
        onClick: () =>
          setDate({ startDate: dayjs(), endDate: dayjs().add(1, "month") }),
      },
    ];

    const handleDatesChange = (date: {
      startDate: dayjs.Dayjs;
      endDate: dayjs.Dayjs;
    }) => {
      setDate(date);
    };

    return (
      <CalendarRange
        startDate={date.startDate}
        endDate={date.endDate}
        actions={actions}
        onDatesChange={handleDatesChange}
      />
    );
  },
};

export const IsOutsideRange: StoryObj<CalendarRangeProps> = {
  render: () => {
    const [date, setDate] = React.useState({
      startDate: dayjs(),
      endDate: dayjs().add(1, "week"),
    });

    const handleDatesChange = (date: {
      startDate: dayjs.Dayjs;
      endDate: dayjs.Dayjs;
    }) => {
      setDate(date);
    };

    const isOutsideRange = (day: dayjs.Dayjs) =>
      day.isBefore(dayjs().subtract(1, "day"));

    return (
      <CalendarRange
        startDate={date.startDate}
        endDate={date.endDate}
        isOutsideRange={isOutsideRange}
        onDatesChange={handleDatesChange}
      />
    );
  },
};
