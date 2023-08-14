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
    return <Calendar date={date} onChange={setDate} />;
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
    return <Calendar date={date} actions={actions} onChange={setDate} />;
  },
};
