import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import ButtonGroup from ".";
import Button from "../Button";
import { ButtonGroupProps } from "./ButtonGroup";
import { Flex, Spacer, Typography } from "..";

export default {
  title: "Components/Inputs/ButtonGroup",
  component: ButtonGroup,
  subcomponents: { Button },
};

export const Example: Story<ButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button>Save</Button>
    <Button>Edit</Button>
    <Button>Delete</Button>
    <Button>Cancel</Button>
  </ButtonGroup>
);

export const DesignSamples = () => (
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
);

export const DisablePartially: Story<ButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button>Save</Button>
    <Button disabled>Edit</Button>
    <Button>Delete</Button>
    <Button>Cancel</Button>
  </ButtonGroup>
);

export const LinkMixed: Story<ButtonGroupProps> = (args) => {
  const Link: React.FC<{ href: string; className: string }> = ({
    href,
    className,
    children,
  }) => (
    // MEMO: Add className props to apply style
    <a href={href} className={className}>
      {children}
    </a>
  );
  return (
    <ButtonGroup {...args}>
      <Button component={Link} href="#">
        Link via {`<Link />`} Component
      </Button>
      <Button href="#">Link via href props</Button>
    </ButtonGroup>
  );
};

LinkMixed.parameters = { docs: { source: { type: "code" } } };
