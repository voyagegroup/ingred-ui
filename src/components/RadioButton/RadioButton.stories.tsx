import React from "react";
import { StoryObj } from "@storybook/react";
import RadioButton, { RadioButtonProps, RadioButtonSize } from "./RadioButton";

export default {
  title: "Components/Inputs/RadioButton",
  component: RadioButton,
  args: {
    size: RadioButtonSize.MEDIUM,
  },
};

export const Example: StoryObj<RadioButtonProps> = {
  args: {
    name: "example",
  },
  render: (args) => (
    <>
      <RadioButton {...args}>One</RadioButton>
      <br />
      <RadioButton {...args}>Two</RadioButton>
    </>
  ),
};

export const DesignSamples: StoryObj = {
  render: () => (
    <>
      <RadioButton>Basic</RadioButton>
      <br />
      <RadioButton checked={true}>Selected</RadioButton>
      <br />
      <RadioButton disabled={true}>Disabled</RadioButton>
      <br />
      <RadioButton disabled={true} checked={true}>
        Disabled(checked)
      </RadioButton>
    </>
  ),
};
