import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Controls, Stories, Title, Markdown } from "@storybook/blocks";
import { action } from "@storybook/addon-actions";
import Button from "./Button";
import Flex from "../Flex";
import Icon from "../Icon";

const meta: Meta<typeof Button> = {
  title: "Components/Inputs/Button",
  component: Button,
  args: {
    onClick: action("clicked"),
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <div>
            <Markdown>
              {`
### Use with router library like "react-router"

Here's an example code.  

But We have plan to change like [Material-UI](https://material-ui.com/guides/composition/#link).

\`\`\`tsx
// Get "className" prop to enable <Button /> style.
const LinkToHome = ({ className, children }) => (
  // "href" prop defines not via <Button />
  <Link className={className} href="/home">
    {children}
  </Link>
);

const ButtonWithRouterLink = ({ children }) => (
  <Button component={LinkToHome}>{children}</Button>
);
\`\`\`
              `}
            </Markdown>
            <Controls />
            <Stories includePrimary title="Samples" />
          </div>
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    children: "primary",
  },
};

export const BasicLight: Story = {
  args: {
    children: "basic light",
    color: "basicLight",
  },
};

export const Danger: Story = {
  args: {
    children: "danger",
    color: "danger",
  },
};

export const Clear: Story = {
  args: {
    children: "clear",
    color: "clear",
  },
};

export const BasicDark: Story = {
  args: {
    children: "basic dark",
    color: "basicDark",
  },
};

export const PrimaryPale: Story = {
  args: {
    children: "pale",
    color: "primary-pale",
  },
};

export const Small: Story = {
  args: {
    children: "small",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "medium",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "large",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    children: "disabled",
    disabled: true,
  },
};

export const UseHrefProps: Story = {
  args: {
    children: "use href props",
    href: "https://www.google.com",
    target: "_blank",
    rel: "noopener noreferrer",
  },
};

export const DesignSamples: Story = {
  render: () => (
    <>
      <Flex display="flex" gap={3}>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button
            color="primaryPale"
            size="small"
            icon={
              <Icon name="image" alt="写真" color="currentColor" size="md" />
            }
          />
          <Button
            color="primaryPale"
            size="small"
            icon={
              <Icon name="image" alt="写真" color="currentColor" size="md" />
            }
          />
          <Button
            color="basicLight"
            size="small"
            icon={
              <Icon name="image" alt="写真" color="currentColor" size="md" />
            }
          />
          <Button
            color="basicDark"
            size="small"
            icon={
              <Icon name="image" alt="写真" color="currentColor" size="md" />
            }
          />
          <Button
            color="danger"
            size="small"
            icon={
              <Icon name="image" alt="写真" color="currentColor" size="md" />
            }
          />
          <Button
            color="danger"
            disabled={true}
            size="small"
            icon={
              <Icon name="image" alt="写真" color="currentColor" size="md" />
            }
          />
          <Button
            color="clear"
            size="small"
            icon={
              <Icon name="image" alt="写真" color="currentColor" size="md" />
            }
          />
          <Button
            color="clear"
            disabled={true}
            size="small"
            icon={
              <Icon name="image" alt="写真" color="currentColor" size="md" />
            }
          />
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button color="primaryPale" size="medium">
            <Icon name="image" alt="写真" color="currentColor" size="md" />
          </Button>
          <Button color="primaryPale" size="medium">
            <Icon name="image" alt="写真" color="currentColor" size="md" />
          </Button>
          <Button color="basicLight" size="medium">
            <Icon name="image" alt="写真" color="currentColor" size="md" />
          </Button>
          <Button color="basicDark" size="medium">
            <Icon name="image" alt="写真" color="currentColor" size="md" />
          </Button>
          <Button color="danger" size="medium">
            <Icon name="image" alt="写真" color="currentColor" size="md" />
          </Button>
          <Button color="danger" disabled={true} size="medium">
            <Icon name="image" alt="写真" color="currentColor" size="md" />
          </Button>
          <Button color="clear" size="medium">
            <Icon name="image" alt="写真" color="currentColor" size="md" />
          </Button>
          <Button color="clear" disabled={true} size="medium">
            <Icon name="image" alt="写真" color="currentColor" size="md" />
          </Button>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button color="primaryPale" size="large">
            <Icon name="image" alt="写真" color="currentColor" size="md-lg" />
          </Button>
          <Button color="primaryPale" size="large">
            <Icon name="image" alt="写真" color="currentColor" size="md-lg" />
          </Button>
          <Button color="basicLight" size="large">
            <Icon name="image" alt="写真" color="currentColor" size="md-lg" />
          </Button>
          <Button color="basicDark" size="large">
            <Icon name="image" alt="写真" color="currentColor" size="md-lg" />
          </Button>
          <Button color="danger" size="large">
            <Icon name="image" alt="写真" color="currentColor" size="md-lg" />
          </Button>
          <Button color="danger" disabled={true} size="large">
            <Icon name="image" alt="写真" color="currentColor" size="md-lg" />
          </Button>
          <Button color="clear" size="large">
            <Icon name="image" alt="写真" color="currentColor" size="md-lg" />
          </Button>
          <Button color="clear" disabled={true} size="large">
            <Icon name="image" alt="写真" color="currentColor" size="md-lg" />
          </Button>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button size="small">Button</Button>
          <Button color="primaryPale" size="small">
            Primary Pale Button
          </Button>
          <Button color="basicLight" size="small">
            Secondary Button
          </Button>
          <Button color="basicDark" size="small">
            Basic Dark Button
          </Button>
          <Button color="danger" size="small">
            Danger Button
          </Button>
          <Button color="danger" disabled={true} size="small">
            Danger Button (Disabled)
          </Button>
          <Button color="clear" size="small">
            Clear Button
          </Button>
          <Button color="clear" disabled={true} size="small">
            Clear Button (Disabled)
          </Button>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button
            color="primaryPale"
            size="small"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="primaryPale"
            size="small"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="basicLight"
            size="small"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="basicDark"
            size="small"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="danger"
            size="small"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="danger"
            disabled={true}
            size="small"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="clear"
            size="small"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="clear"
            disabled={true}
            size="small"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button size="medium">Button</Button>
          <Button color="primaryPale" size="medium">
            Primary Pale Button
          </Button>
          <Button color="basicLight" size="medium">
            Secondary Button
          </Button>
          <Button color="basicDark" size="medium">
            Basic Dark Button
          </Button>
          <Button color="danger" size="medium">
            Danger Button
          </Button>
          <Button color="danger" disabled={true} size="medium">
            Danger Button (Disabled)
          </Button>
          <Button color="clear" size="medium">
            Clear Button
          </Button>
          <Button color="clear" disabled={true} size="medium">
            Clear Button (Disabled)
          </Button>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button
            size="medium"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="primaryPale"
            size="medium"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="basicLight"
            size="medium"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="basicDark"
            size="medium"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="danger"
            size="medium"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="danger"
            disabled={true}
            size="medium"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="clear"
            size="medium"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="clear"
            disabled={true}
            size="medium"
            icon={<Icon name="image" color="currentColor" size="md" />}
          >
            ボタンのラベル
          </Button>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button size="large">Button</Button>
          <Button color="primaryPale" size="large">
            Primary Pale Button
          </Button>
          <Button color="basicLight" size="large">
            Secondary Button
          </Button>
          <Button color="basicDark" size="large">
            Basic Dark Button
          </Button>
          <Button color="danger" size="large">
            Danger Button
          </Button>
          <Button color="danger" disabled={true} size="large">
            Danger Button (Disabled)
          </Button>
          <Button color="clear" size="large">
            Clear Button
          </Button>
          <Button color="clear" disabled={true} size="large">
            Clear Button (Disabled)
          </Button>
        </Flex>
        <Flex display="flex" flexDirection="column" gap={1}>
          <Button
            size="large"
            inline={true}
            icon={<Icon name="image" color="currentColor" size="md-lg" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="primaryPale"
            size="large"
            inline={true}
            icon={<Icon name="image" color="currentColor" size="md-lg" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="basicLight"
            size="large"
            inline={true}
            icon={<Icon name="image" color="currentColor" size="md-lg" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="basicDark"
            size="large"
            inline={true}
            icon={<Icon name="image" color="currentColor" size="md-lg" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="danger"
            size="large"
            inline={true}
            icon={<Icon name="image" color="currentColor" size="md-lg" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="danger"
            disabled={true}
            size="large"
            inline={true}
            icon={<Icon name="image" color="currentColor" size="md-lg" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="clear"
            size="large"
            inline={true}
            icon={<Icon name="image" color="currentColor" size="md-lg" />}
          >
            ボタンのラベル
          </Button>
          <Button
            color="clear"
            disabled={true}
            size="large"
            inline={true}
            icon={<Icon name="image" color="currentColor" size="md-lg" />}
          >
            ボタンのラベル
          </Button>
        </Flex>
      </Flex>
    </>
  ),
};
