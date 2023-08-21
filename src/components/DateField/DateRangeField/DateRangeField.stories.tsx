import { StoryObj } from "@storybook/react";
import DateRangeField, { DateRangeFieldProps } from "./DateRangeField";
import dayjs from "dayjs";
import React, { useState } from "react";

export default {
  title: "Components/Inputs/DateRangeField",
  component: DateRangeField,
};

export const Example: StoryObj<DateRangeFieldProps> = {
  render: (args) => {
    const [date, setDate] = useState({
      startDate: dayjs(),
      endDate: dayjs().add(1, "day"),
    });
    return <DateRangeField {...args} date={date} onDatesChange={setDate} />;
  },
};

export const Custom: StoryObj<DateRangeFieldProps> = {
  args: {
    format: "MM/DD/YYYY",
  },
  render: (args) => {
    const [date, setDate] = useState({
      startDate: dayjs(),
      endDate: dayjs().add(1, "day"),
    });
    return <DateRangeField {...args} date={date} onDatesChange={setDate} />;
  },
};

export const Japanese: StoryObj<DateRangeFieldProps> = {
  ...Example,
  args: {
    format: "YYYY年MM月DD日",
  },
};

export const Error: StoryObj<DateRangeFieldProps> = {
  ...Example,
  args: {
    errorText: "エラー",
  },
};
