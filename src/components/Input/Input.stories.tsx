import * as React from "react";
import Input, { InputProps } from "./Input";
import { Story } from "@storybook/react/types-6-0";
import { Flex, Spacer, Typography } from "..";

export default {
  title: "Components/Inputs/Input",
  component: Input,
  args: {
    placeholder: "placeholder",
  },
};

export const Example: Story<InputProps> = (args) => <Input {...args} />;

export const Textarea: Story<InputProps> = (args) => <Input {...args} />;
Textarea.args = {
  multiline: true,
};

export const DesignSamples: Story<InputProps> = () => (
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
);
