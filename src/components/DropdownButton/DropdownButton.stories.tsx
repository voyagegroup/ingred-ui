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
        <Typography weight="bold">Basic Light</Typography>
        <Spacer pt={2} />
        <DropdownButton color="basicLight" {...args}>
          Basic Light
        </DropdownButton>
      </div>
      <Spacer pl={3} />
      <div>
        <Typography weight="bold">Basic Dark</Typography>
        <Spacer pt={2} />
        <DropdownButton color="basicDark" {...args}>
          Basic Dark
        </DropdownButton>
      </div>
      <Spacer pl={3} />
      <div>
        <Typography weight="bold">Disabled</Typography>
        <Spacer pt={2} />
        <DropdownButton color="basicDark" disabled={true} {...args}>
          Basic Dark (Disabled)
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
        <Typography weight="bold">Split (small) </Typography>
        <Spacer pt={2} />
        <DropdownButton split={true} size="small" {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} size="small" color="basicLight" {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} size="small" color="basicDark" {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} size="small" disabled={true} {...args}>
          Split
        </DropdownButton>
      </div>
      <Spacer pl={3} />
      <div>
        <Typography weight="bold">Split (Medium, Default)</Typography>
        <Spacer pt={2} />
        <DropdownButton split={true} {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} color="basicLight" {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} color="basicDark" {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} disabled={true} {...args}>
          Split
        </DropdownButton>
      </div>
      <Spacer pl={3} />
      <div>
        <Typography weight="bold">Split (Large)</Typography>
        <Spacer pt={2} />
        <DropdownButton split={true} size="large" {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} size="large" color="basicLight" {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} size="large" color="basicDark" {...args}>
          Split
        </DropdownButton>
        <Spacer pt={2} />
        <DropdownButton split={true} size="large" disabled={true} {...args}>
          Split
        </DropdownButton>
      </div>
    </Flex>
  ),
};
