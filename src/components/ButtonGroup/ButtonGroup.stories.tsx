import * as React from "react";
import { StoryObj } from "@storybook/react";
import Button from "../Button";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";
import { Flex, Spacer, Typography } from "..";

export default {
  title: "Components/Inputs/ButtonGroup",
  component: ButtonGroup,
  subcomponents: { Button },
};

export const Example: StoryObj<ButtonGroupProps> = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Save</Button>
      <Button>Edit</Button>
      <Button>Delete</Button>
      <Button>Cancel</Button>
    </ButtonGroup>
  ),
};

export const DesignSamples: StoryObj = {
  render: () => (
    <Flex display="flex">
      <div>
        <Typography weight="bold">Size Medium</Typography>
        <Spacer pt={2} />
        <ButtonGroup>
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <Spacer pl={5} />
      <div>
        <Typography weight="bold">Size Small</Typography>
        <Spacer pt={2} />
        <ButtonGroup size="small">
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
    </Flex>
  ),
};

export const DisablePartially: StoryObj<ButtonGroupProps> = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Save</Button>
      <Button disabled>Edit</Button>
      <Button>Delete</Button>
      <Button>Cancel</Button>
    </ButtonGroup>
  ),
};

export const LinkMixed: StoryObj<ButtonGroupProps> = {
  render: (args) => {
    const Link: React.FC<{
      href: string;
      className: string;
      children: React.ReactNode;
    }> = ({ href, className, children }) => (
      // MEMO: Add className props to apply style
      <a href={href} className={className}>
        {children}
      </a>
    );
    return (
      <ButtonGroup {...args}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Button component={Link} href="#">
          Link via {`<Link />`} Component
        </Button>
        <Button href="#">Link via href props</Button>
      </ButtonGroup>
    );
  },
};

LinkMixed.parameters = { docs: { source: { type: "code" } } };
