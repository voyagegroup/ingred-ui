import * as React from "react";
import DropdownButton, { DropdownButtonProps } from "./";
import { Story } from "@storybook/react/types-6-0";
import { Flex, Spacer, Typography } from "..";
import { ContentProp } from "../MenuList/MenuList";

export default {
  title: "Components/Inputs/DropdownButton",
  component: DropdownButton,
};

const contents: ContentProp[] = [
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
];

export const Example: Story<DropdownButtonProps> = (args) => (
  <DropdownButton {...args}>Click me!!</DropdownButton>
);

Example.args = {
  contents,
};

export const Colors: Story<DropdownButtonProps> = () => (
  <Flex display="flex">
    <div>
      <Typography weight="bold">Primary</Typography>
      <Spacer pt={2} />
      <DropdownButton color="primary" contents={contents}>
        Primary
      </DropdownButton>
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Secondary</Typography>
      <Spacer pt={2} />
      <DropdownButton color="secondary" contents={contents}>
        Secondary
      </DropdownButton>
    </div>
  </Flex>
);

export const Sizes: Story<DropdownButtonProps> = () => (
  <Flex display="flex">
    <div>
      <Typography weight="bold">Small</Typography>
      <Spacer pt={2} />
      <DropdownButton size="small" contents={contents}>
        Small
      </DropdownButton>
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Medium</Typography>
      <Spacer pt={2} />
      <DropdownButton size="medium" contents={contents}>
        Medium
      </DropdownButton>
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Large</Typography>
      <Spacer pt={2} />
      <DropdownButton size="large" contents={contents}>
        Large
      </DropdownButton>
    </div>
  </Flex>
);

export const Split: Story<DropdownButtonProps> = () => (
  <Flex display="flex">
    <div>
      <Typography weight="bold">Normal</Typography>
      <Spacer pt={2} />
      <DropdownButton contents={contents}>Normal</DropdownButton>
    </div>
    <Spacer pl={3} />
    <div>
      <Typography weight="bold">Split</Typography>
      <Spacer pt={2} />
      <DropdownButton split={true} contents={contents}>
        Split
      </DropdownButton>
    </div>
  </Flex>
);
