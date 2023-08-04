import { StoryObj } from "@storybook/react";
import * as React from "react";
import { Flex, Spacer, Typography } from "..";
import TextField, { TextFieldProps } from "./TextField";

export default {
  title: "Components/Inputs/TextField",
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: `
The wrapper of ${"`<Input />`"} component.
`,
      },
    },
  },
};

export const Example: StoryObj<TextFieldProps> = {
  args: {
    placeholder: "search",
    icon: "search",
  },
};

export const Password: StoryObj<TextFieldProps> = {
  args: {
    type: "password",
    defaultValue: "hoge",
  },
};

export const Error: StoryObj = {
  render: () => (
    <Flex display="flex">
      <div>
        <Typography weight="bold">Input</Typography>
        <Spacer pt={2} />
        <TextField type="number" errorText="Please input number only" />
      </div>
      <Spacer pl={5} />
      <div>
        <Typography weight="bold">Text field</Typography>
        <Spacer pt={2} />
        <TextField errorText="Invalid input" multiline={true} />
      </div>
    </Flex>
  ),
};
