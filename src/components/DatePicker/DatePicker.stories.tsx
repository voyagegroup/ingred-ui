import { StoryObj } from "@storybook/react";
import DatePicker, { DatePickerProps } from "./DatePicker";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

export default {
  title: "Components/Inputs/DatePicker",
  component: DatePicker,
  args: {
    format: "YYYY-MM-DD",
  },
};

export const Example: StoryObj<DatePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState(dayjs());
    return <DatePicker {...args} date={date} onDateChange={setDate} />;
  },
};

export const WithActions: StoryObj<DatePickerProps> = {
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
      <DatePicker
        {...args}
        date={date}
        actions={actions}
        onDateChange={setDate}
      />
    );
  },
};

export const WithActionsWithDefaultClickAction: StoryObj<DatePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState(dayjs());
    const [clickAction, setClickAction] = useState("今日");
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

    const handleDateChange = (date: Dayjs) => {
      setDate(date);
      setClickAction("");
    };

    return (
      <DatePicker
        {...args}
        date={date}
        defaultClickAction={clickAction}
        actions={actions}
        onClickAction={(action) => setClickAction(action.text)}
        onDateChange={handleDateChange}
      />
    );
  },
};

export const Error: StoryObj<DatePickerProps> = {
  ...Example,
  args: {
    errorText: "エラー",
  },
};

export const Disabled: StoryObj<DatePickerProps> = {
  ...Example,
  args: {
    disabled: true,
  },
};

export const IsOutsideRange: StoryObj<DatePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState(dayjs());
    const isOutsideRange = (day: dayjs.Dayjs) =>
      day.isBefore(dayjs().subtract(1, "day"));

    return (
      <DatePicker
        {...args}
        date={date}
        isOutsideRange={isOutsideRange}
        onDateChange={setDate}
      />
    );
  },
};
