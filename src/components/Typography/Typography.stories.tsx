import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import Typography from "./";
import { TypographyProps } from "./Typography";

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

export const Example: Story<TypographyProps> = (args) => (
  <Typography {...args}>Typography</Typography>
);
