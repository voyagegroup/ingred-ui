import * as React from "react";
import DropdownButton, { DropdownButtonProps } from "./DropdownButton";
import { StoryObj } from "@storybook/react";
import { Flex, Spacer, Typography } from "..";

export default {
  title: "Components/Inputs/DropdownButton",
  component: DropdownButton,
  args: {
    contents: [
      {
        text: "Save",
        onClick: () => {},
        type: "default",
      },
      {
        text: "Save and execute",
        onClick: () => {},
        divideTop: true,
        type: "default",
      },
      {
        text: "Save as draft",
        onClick: () => {},
        type: "default",
      },
      {
        text: "Delete",
        onClick: () => {},
        divideTop: true,
        type: "default",
      },
    ],
  },
};

export const Example: StoryObj<DropdownButtonProps> = {
  render: (args) => <DropdownButton {...args}>Click me!!</DropdownButton>,
};

export const Colors: StoryObj<DropdownButtonProps> = {
  render: (args) => (
    <Flex display="flex">
      <div>
        <Typography weight="bold">Primary</Typography>
        <Spacer pt={2} />
        <DropdownButton color="primary" {...args}>
          Primary
        </DropdownButton>
      </div>
      <Spacer pl={3} />
      <div>
        <Typography weight="bold">Secondary</Typography>
        <Spacer pt={2} />
        <DropdownButton color="secondary" {...args}>
          Secondary
        </DropdownButton>
      </div>
    </Flex>
  ),
};

export const Sizes: StoryObj<DropdownButtonProps> = {
  render: (args) => (
    <Flex display="flex">
      <div>
        <Typography weight="bold">Small</Typography>
        <Spacer pt={2} />
        <DropdownButton size="small" {...args}>
          Small
        </DropdownButton>
      </div>
      <Spacer pl={3} />
      <div>
        <Typography weight="bold">Medium</Typography>
        <Spacer pt={2} />
        <DropdownButton size="medium" {...args}>
          Medium
        </DropdownButton>
      </div>
      <Spacer pl={3} />
      <div>
        <Typography weight="bold">Large</Typography>
        <Spacer pt={2} />
        <DropdownButton size="large" {...args}>
          Large
        </DropdownButton>
      </div>
    </Flex>
  ),
};

export const Split: StoryObj<DropdownButtonProps> = {
  render: (args) => (
    <Flex display="flex">
      <div>
        <Typography weight="bold">Normal</Typography>
        <Spacer pt={2} />
        <DropdownButton {...args}>Normal</DropdownButton>
      </div>
      <Spacer pl={3} />
      <div>
        <Typography weight="bold">Split</Typography>
        <Spacer pt={2} />
        <DropdownButton split={true} {...args}>
          Split
        </DropdownButton>
      </div>
    </Flex>
  ),
};
