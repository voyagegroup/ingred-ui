import { StoryObj } from "@storybook/react";
import NewDateRangePicker, {
  NewDateRangePickerProps,
} from "./NewDateRangePicker";
import dayjs from "dayjs";
import React, { useState } from "react";

export default {
  title: "Components/Inputs/NewDateRangePicker",
  component: NewDateRangePicker,
  args: {
    format: "YYYY-MM-DD",
  },
};

export const Example: StoryObj<NewDateRangePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState({
      startDate: dayjs(),
      endDate: dayjs().add(1, "week"),
    });

    return (
      <NewDateRangePicker
        {...args}
        startDate={date.startDate}
        endDate={date.endDate}
        onDatesChange={setDate}
      />
    );
  },
};

export const WithActions: StoryObj<NewDateRangePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState({
      startDate: dayjs(),
      endDate: dayjs().add(1, "week"),
    });
    const actions = [
      {
        text: "今日",
        onClick: () => {
          setDate({
            startDate: dayjs(),
            endDate: dayjs(),
          });
        },
      },
      {
        text: "明日",
        onClick: () => {
          setDate({
            startDate: dayjs(),
            endDate: dayjs().add(1, "day"),
          });
        },
      },
      {
        text: "来週",
        onClick: () => {
          setDate({
            startDate: dayjs(),
            endDate: dayjs().add(1, "week"),
          });
        },
      },
    ];

    return (
      <NewDateRangePicker
        {...args}
        actions={actions}
        startDate={date.startDate}
        endDate={date.endDate}
        onDatesChange={setDate}
      />
    );
  },
};

export const Error: StoryObj<NewDateRangePickerProps> = {
  ...Example,
  args: {
    errorText: "エラー",
  },
};

export const Disabled: StoryObj<NewDateRangePickerProps> = {
  ...Example,
  args: {
    disabled: true,
  },
};

export const IsOutsideRange: StoryObj<NewDateRangePickerProps> = {
  render: (args) => {
    const [date, setDate] = useState({
      startDate: dayjs(),
      endDate: dayjs().add(1, "week"),
    });

    const isOutsideRange = (day: dayjs.Dayjs) =>
      day.isBefore(dayjs().subtract(1, "day"));

    return (
      <NewDateRangePicker
        {...args}
        startDate={date.startDate}
        endDate={date.endDate}
        isOutsideRange={isOutsideRange}
        onDatesChange={setDate}
      />
    );
  },
};
