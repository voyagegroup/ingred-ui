import React from "react";
import { StoryObj } from "@storybook/react";
import RadioButton, { RadioButtonProps, RadioButtonSize } from "./RadioButton";
import { Flex } from "..";

export default {
  title: "Components/Inputs/RadioButton",
  component: RadioButton,
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    checked: {
      control: {
        type: "boolean",
      },
    },
    size: {
      control: {
        type: "select",
        options: Object.values(RadioButtonSize),
      },
    },
  },
};

export const Example: StoryObj<RadioButtonProps> = {
  args: {
    name: "example",
  },
  render: (args) => (
    <>
      <RadioButton {...args}>ラベル One</RadioButton>
      <br />
      <RadioButton {...args}>ラベル Two</RadioButton>
    </>
  ),
};

export const DesignSamples: StoryObj = {
  render: () => (
    <>
      <Flex display="flex" gap={3}>
        <Flex display="flex" flexDirection="column" gap={1}>
          <RadioButton size={RadioButtonSize.SMALL}>Basic</RadioButton>
          <RadioButton size={RadioButtonSize.SMALL} checked={true}>
            Selected
          </RadioButton>
          <RadioButton size={RadioButtonSize.SMALL} disabled={true}>
            Disabled
          </RadioButton>
          <RadioButton
            size={RadioButtonSize.SMALL}
            disabled={true}
            checked={true}
          >
            Disabled(checked)
          </RadioButton>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <RadioButton>Basic</RadioButton>
          <RadioButton checked={true}>Selected</RadioButton>
          <RadioButton disabled={true}>Disabled</RadioButton>
          <RadioButton disabled={true} checked={true}>
            Disabled(checked)
          </RadioButton>
        </Flex>
      </Flex>
    </>
  ),
};
