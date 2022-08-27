import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import DateTimePicker, { DateTimePickerProps } from ".";

export default {
  title: "Components/〇〇/DateTimePicker",
  component: DateTimePicker,
};

export const Example: Story<DateTimePickerProps> = (args) => (
  <DateTimePicker {...args} />
);
