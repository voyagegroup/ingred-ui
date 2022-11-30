import * as React from "react";
import CalenderInput from "./CalenderInput";
import { Story } from "@storybook/react/types-6-0";

export default {
  title: "Components/Inputs/CalenderInput",
  component: CalenderInput,
  args: {
    placeholder: "placeholder",
  },
};

export const Example: Story = () => <CalenderInput />;
