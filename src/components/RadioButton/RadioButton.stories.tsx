import React from "react";
import { Story } from "@storybook/react/types-6-0";
import RadioButton, { RadioButtonProps, RadioButtonSize } from "./";

export default {
  title: "Components/Inputs/RadioButton",
  component: RadioButton,
  args: {
    size: RadioButtonSize.MEDIUM,
  },
};

export const Example: Story<RadioButtonProps> = (args) => (
  <>
    <RadioButton {...args}>One</RadioButton>
    <br />
    <RadioButton {...args}>Two</RadioButton>
  </>
);

Example.args = {
  name: "example",
};

export const DesignSamples = () => (
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
);
