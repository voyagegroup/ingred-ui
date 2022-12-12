import * as React from "react";
import CalenderRangeInput from "./CalenderRangeInput";
import { Story } from "@storybook/react/types-6-0";

export default {
  title: "Components/Inputs/CalenderRangeInput",
  component: CalenderRangeInput,
  args: {
    placeholder: "placeholder",
  },
};

export const Example: Story = () => <CalenderRangeInput />;
