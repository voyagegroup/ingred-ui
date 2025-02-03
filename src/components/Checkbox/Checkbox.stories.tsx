import React from "react";
import { StoryObj } from "@storybook/react";
import Checkbox, { CheckBoxProps, CheckboxSize } from "./Checkbox";
import { Flex } from "..";

export default {
  title: "Components/Inputs/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      type: "select",
      options: ["small", "medium"],
    },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export const Example: StoryObj<CheckBoxProps> = {
  render: (args) => <Checkbox {...args}>Checkbox</Checkbox>,
};

export const DesignSamples: StoryObj = {
  render: () => (
    <>
      <Flex display="flex" gap={3}>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Checkbox checked={false} size={CheckboxSize.SMALL}>
            Not checked
          </Checkbox>
          <Checkbox checked={true} size={CheckboxSize.SMALL}>
            Checked
          </Checkbox>
          <Checkbox
            indeterminate={true}
            checked={true}
            size={CheckboxSize.SMALL}
          >
            Checked(indeterminate)
          </Checkbox>
          <Checkbox disabled checked={false} size={CheckboxSize.SMALL}>
            Not checked(disabled)
          </Checkbox>
          <Checkbox disabled checked={true} size={CheckboxSize.SMALL}>
            Checked(disabled)
          </Checkbox>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
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
      </Flex>
    </>
  ),
};
