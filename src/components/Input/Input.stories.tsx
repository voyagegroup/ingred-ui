import { StoryObj } from "@storybook/react";
import * as React from "react";
import { Flex, Spacer, Typography } from "..";
import Input, { InputProps } from "./Input";

export default {
  title: "Components/Inputs/Input",
  component: Input,
  args: {
    placeholder: "placeholder",
  },
};

export const Example: StoryObj<InputProps> = {};

export const Textarea: StoryObj<InputProps> = {
  args: {
    multiline: true,
  },
};

export const DesignSamples: StoryObj<InputProps> = {
  render: () => (
    <>
      <Typography size="xxl" weight="bold">
        Normal
      </Typography>
      <Spacer pt={3} />
      <Flex display="flex">
        <div>
          <Typography weight="bold">Empty</Typography>
          <Spacer pt={2} />
          <Input />
        </div>
        <Spacer pl={3} />
        <div>
          <Typography weight="bold">Typed</Typography>
          <Spacer pt={2} />
          <Input value="typed" />
        </div>
      </Flex>
      <Spacer pt={3} />
      <Typography size="xxl" weight="bold">
        Disabled
      </Typography>
      <Spacer pt={3} />
      <Flex display="flex">
        <div>
          <Typography weight="bold">Empty</Typography>
          <Spacer pt={2} />
          <Input disabled={true} />
        </div>
        <Spacer pl={3} />
        <div>
          <Typography weight="bold">Typed</Typography>
          <Spacer pt={2} />
          <Input disabled={true} value="typed" />
        </div>
        <Spacer pl={3} />
      </Flex>
      <Spacer pt={3} />
      <Typography size="xxl" weight="bold">
        Error
      </Typography>
      <Spacer pt={3} />
      <Flex display="flex">
        <div>
          <Typography weight="bold">Empty</Typography>
          <Spacer pt={2} />
          <Input error={true} />
        </div>
        <Spacer pl={3} />
        <div>
          <Typography weight="bold">Typed</Typography>
          <Spacer pt={2} />
          <Input error={true} value="typed" />
        </div>
        <Spacer pl={3} />
      </Flex>
    </>
  ),
};
