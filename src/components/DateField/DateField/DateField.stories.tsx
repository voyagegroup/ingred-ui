import { StoryObj } from "@storybook/react";
import DateField, { DateFieldProps } from "./DateField";
import dayjs from "dayjs";
import React, { useState } from "react";

export default {
  title: "Components/Inputs/DateField",
  component: DateField,
};

export const Example: StoryObj<DateFieldProps> = {
  render: (args) => {
    const [date, setDate] = useState(dayjs());
    return <DateField {...args} date={date} onDateChange={setDate} />;
  },
};

export const Custom: StoryObj<DateFieldProps> = {
  args: {
    format: "MM/DD/YYYY",
  },
  render: (args) => {
    const [date, setDate] = useState(dayjs());
    return <DateField {...args} date={date} onDateChange={setDate} />;
  },
};

export const Japanese: StoryObj<DateFieldProps> = {
  ...Example,
  args: {
    format: "YYYY月MM月DD日",
  },
};

export const Error: StoryObj<DateFieldProps> = {
  ...Example,
  args: {
    errorText: "エラー",
  },
};
