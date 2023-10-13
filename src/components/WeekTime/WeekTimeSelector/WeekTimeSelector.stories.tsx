import * as React from "react";
import { StoryObj } from "@storybook/react";
import WeekTimeSelector, { WeekTimeSelectorProps } from "./WeekTimeSelector";

export default {
  title: "Components/Inputs/WeekTime",
  component: WeekTimeSelector,
};

export const Example: StoryObj<WeekTimeSelectorProps> = {
  args: {
    weekTime: "ffffffffffffffffffffffffffffffffffffffffff",
  },
  render: (args) => {
    const [weekTime, setWeekTime] = React.useState(args.weekTime);

    return <WeekTimeSelector weekTime={weekTime} onChange={setWeekTime} />;
  },
};
