import React from "react";
import { StoryObj } from "@storybook/react";
import Checkbox, { CheckBoxProps } from "./Checkbox";
import { Flex } from "..";

export default {
  title: "Components/Inputs/Checkbox",
  component: Checkbox,
  argTypes: {
    onChange: { action: "changed" },
  },
};

export const Example: StoryObj<CheckBoxProps> = {
  render: (args) => <Checkbox {...args}>Checkbox</Checkbox>,
};

export const DesignSamples: StoryObj = {
  render: () => (
    <Flex display="flex" flexDirection="column">
      <Checkbox checked={false}>Not checked</Checkbox>
      <Checkbox checked={true}>Checked</Checkbox>
      <Checkbox indeterminate={true} checked={true}>
        Checked(indeterminate)
      </Checkbox>
      <Checkbox disabled checked={false}>
        Not checked(disabled)
      </Checkbox>
      <Checkbox disabled checked={true}>
        Checked(disabled)
      </Checkbox>
    </Flex>
  ),
};
