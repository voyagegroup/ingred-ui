import * as React from "react";
import { StoryObj } from "@storybook/react";
import Button from "../Button";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";
import { Flex, Icon, Spacer, Typography } from "..";

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
        <Typography weight="bold">Size Small</Typography>
        <Spacer pt={2} />
        <ButtonGroup size="small">
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="small" color="basicDark">
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="small" color="basicDark" disabled={true}>
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="small">
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="small" color="basicDark">
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="small" color="basicDark" disabled={true}>
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="small">
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="small" color="basicDark">
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="small" color="basicDark" disabled={true}>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
      </div>
      <Spacer pl={5} />
      <div>
        <Typography weight="bold">Size Medium</Typography>
        <Spacer pt={2} />
        <ButtonGroup size="medium">
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="medium" color="basicDark">
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="medium" color="basicDark" disabled={true}>
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="medium">
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="medium" color="basicDark">
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="medium" color="basicDark" disabled={true}>
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="medium">
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="medium" color="basicDark">
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="medium" color="basicDark" disabled={true}>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
      </div>
      <Spacer pl={5} />
      <div>
        <Typography weight="bold">Size Large</Typography>
        <Spacer pt={2} />
        <ButtonGroup size="large">
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="large" color="basicDark">
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="large" color="basicDark" disabled={true}>
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
          <Button
            icon={
              <Icon name="image" alt="ボタンのラベル" color="currentColor" />
            }
          />
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="large">
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="large" color="basicDark">
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="large" color="basicDark" disabled={true}>
          <Button>Save</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="large">
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="large" color="basicDark">
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
        <Spacer pt={2} />
        <ButtonGroup size="large" color="basicDark" disabled={true}>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン1のラベル
          </Button>
          <Button icon={<Icon name="image" color="currentColor" />}>
            ボタン2のラベル
          </Button>
        </ButtonGroup>
      </div>
      <Spacer pl={5} />
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

export const MinSize: StoryObj<ButtonGroupProps> = {
  render: (args) => (
    <Flex display="flex">
      <div>
        <Typography weight="bold">minSize Small</Typography>
        <Spacer pt={2} />
        <ButtonGroup {...args} minSize="small">
          <Button>Save</Button>
          <Button disabled>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <Spacer pl={5} />
      <div>
        <Typography weight="bold">minSize Medium</Typography>
        <Spacer pt={2} />
        <ButtonGroup {...args} minSize="medium">
          <Button>Save</Button>
          <Button disabled>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <Spacer pl={5} />
      <div>
        <Typography weight="bold">minSize Large</Typography>
        <Spacer pt={2} />
        <ButtonGroup {...args} minSize="large">
          <Button>Save</Button>
          <Button disabled>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <Spacer pl={5} />
      <div>
        <Typography weight="bold">minSize fit-content</Typography>
        <Spacer pt={2} />
        <ButtonGroup {...args} minSize="fit-content">
          <Button>Save</Button>
          <Button disabled>Edit</Button>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
    </Flex>
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

LinkMixed.parameters = { docs: { source: { language: "tsx" } } };
