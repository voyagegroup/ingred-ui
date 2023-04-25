import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import TextField, { TextFieldProps } from "./TextField";
import { Flex, Spacer, Typography } from "..";

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

export const Example: Story<TextFieldProps> = (args) => <TextField {...args} />;

Example.args = {
  placeholder: "search",
  icon: "search",
};

export const Password = () => <TextField defaultValue="hoge" type="password" />;

export const Error = () => (
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
);
