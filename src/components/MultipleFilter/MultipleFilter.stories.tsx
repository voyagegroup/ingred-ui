import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import MultipleFilter, { MultipleFilterProps } from ".";

export default {
  title: "Components/Utils/MultipleFilter",
  component: MultipleFilter,
};

export const Example: Story<MultipleFilterProps> = (args) => (
  <MultipleFilter {...args} />
);
