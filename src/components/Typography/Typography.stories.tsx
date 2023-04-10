import { StoryObj } from "@storybook/react";
import Typography, { TypographyProps } from "./Typography";

export default {
  title: "Components/Data Display/Typography",
  component: Typography,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: [
          "initial",
          "primary",
          "secondary",
          "disabled",
          "hint",
          "white",
        ],
      },
    },
  },
};

export const Example: StoryObj<TypographyProps> = {
  args: {
    children: "Typography",
  },
};
