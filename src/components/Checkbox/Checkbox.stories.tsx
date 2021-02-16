import React from "react";
import { Story } from "@storybook/react/types-6-0";
import Checkbox from ".";
import { CheckBoxProps } from "./Checkbox";
import { Flex } from "..";

export default {
  title: "Components/Inputs/Checkbox",
  component: Checkbox,
  argTypes: {
    onChange: { action: "changed" },
  },
};

export const Example: Story<CheckBoxProps> = (args) => (
  <Checkbox {...args}>Checkbox</Checkbox>
);

export const DesignSamples = () => (
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
);
