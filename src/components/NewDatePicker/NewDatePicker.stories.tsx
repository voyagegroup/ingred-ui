import { StoryObj } from "@storybook/react";
import NewDatePicker, { NewDatePickerProps } from "./NewDatePicker";
import dayjs from "dayjs";
import React, { useState } from "react";

export default {
  title: "Components/Inputs/NewDatePicker",
  component: NewDatePicker,
  args: {
    format: "YYYY-MM-DD",
  },
};

export const Example: StoryObj<NewDatePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState(dayjs());
    return <NewDatePicker {...args} date={date} onDateChange={setDate} />;
  },
};

export const WithActions: StoryObj<NewDatePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState(dayjs());
    const actions = [
      {
        text: "今日",
        onClick: () => {
          setDate(dayjs());
        },
      },
      {
        text: "明日",
        onClick: () => {
          setDate(dayjs().add(1, "day"));
        },
      },
      {
        text: "来週",
        onClick: () => {
          setDate(dayjs().add(1, "week"));
        },
      },
    ];

    return (
      <NewDatePicker
        {...args}
        date={date}
        actions={actions}
        onDateChange={setDate}
      />
    );
  },
};
