import { StoryObj } from "@storybook/react";
import NewDatePicker, { NewDatePickerProps } from "./NewDatePicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Action } from "../Calendar/internal/Actions";

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

export const WithActionsWithDefaultClickAction: StoryObj<NewDatePickerProps> = {
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

    const handleActionClick = (action: Action) => () => {
      setClickAction(action.text);
    };

    return (
      <NewDatePicker
        {...args}
        date={date}
        defaultClickAction={clickAction}
        actions={actions}
        onClickAction={handleActionClick}
        onDateChange={setDate}
      />
    );
  },
};

export const Error: StoryObj<NewDatePickerProps> = {
  ...Example,
  args: {
    errorText: "エラー",
  },
};

export const Disabled: StoryObj<NewDatePickerProps> = {
  ...Example,
  args: {
    disabled: true,
  },
};

export const IsOutsideRange: StoryObj<NewDatePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState(dayjs());
    const isOutsideRange = (day: dayjs.Dayjs) =>
      day.isBefore(dayjs().subtract(1, "day"));

    return (
      <NewDatePicker
        {...args}
        date={date}
        isOutsideRange={isOutsideRange}
        onDateChange={setDate}
      />
    );
  },
};
