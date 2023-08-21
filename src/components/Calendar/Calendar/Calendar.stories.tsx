import React from "react";
import { StoryObj } from "@storybook/react";

import Calendar, { CalendarProps } from "./Calendar";
import dayjs from "dayjs";

export default {
  title: "Components/Inputs/Calendar",
  components: Calendar,
};

export const Default: StoryObj<CalendarProps> = {
  render: () => {
    const [date, setDate] = React.useState(dayjs());
    return <Calendar date={date} onDateChange={setDate} />;
  },
};

export const WithActions: StoryObj<CalendarProps> = {
  render: () => {
    const [date, setDate] = React.useState(dayjs());
    const actions = [
      {
        text: "今日",
        onClick: () => setDate(dayjs()),
      },
      {
        text: "来週",
        onClick: () => setDate(dayjs().add(1, "week")),
      },
      {
        text: "来月",
        onClick: () => setDate(dayjs().add(1, "month")),
      },
    ];
    return <Calendar date={date} actions={actions} onDateChange={setDate} />;
  },
};

export const IsOutsideRange: StoryObj<CalendarProps> = {
  render: () => {
    const [date, setDate] = React.useState(dayjs());

    const isOutsideRange = (day: dayjs.Dayjs) =>
      day.isBefore(dayjs().subtract(1, "day"));

    return (
      <Calendar
        date={date}
        isOutsideRange={isOutsideRange}
        onDateChange={setDate}
      />
    );
  },
};
