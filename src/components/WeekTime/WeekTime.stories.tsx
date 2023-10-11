import * as React from "react";
import { StoryObj } from "@storybook/react";
import WeekTime, { WeekTimeProps } from "./WeekTime";

export default {
  title: "Components/Data Display/WeekTime",
  component: WeekTime,
};

export const Example: StoryObj<WeekTimeProps> = {
  args: {
    weekTime: "ffffffffffffffffffffffffffffffffffffffffff",
  },
  render: (args) => {
    return <WeekTime weekTime={args.weekTime} />;
  },
};
