import React from "react";
import { StoryObj } from "@storybook/react";
import {
  Title,
  Subtitle,
  Description,
  ArgsTable,
  Stories,
} from "@storybook/addon-docs";
import { action } from "@storybook/addon-actions";
import Button, { ButtonProps } from "./Button";

export default {
  title: "Components/Inputs/Button",
  components: Button,
  args: {
    onClick: action("clicked"),
  },
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <ArgsTable of={Button} />
          <Stories includePrimary title="Samples" />
          <Description
            markdown={[
              '### Use with router library like "react-router"',
              "Here's an example code.  ",
              "",
              "But We have plan to change like [Material-UI](https://material-ui.com/guides/composition/#link).",
              "",
              "```tsx",
              '// Get "className" prop to enable <Button /> style.',
              "const LinkToHome = ({ className, children }) => (",
              '// "href" prop defines not via <Button />',
              '  <Link className={className} href="/home">',
              "    {children}",
              "  </Link>",
              ");",
              "",
              "const ButtonWithRouterLink = ({ children }) => (",
              "  <Button component={LinkToHome}>{children}</Button>",
              ");",
              "```",
            ].join("\n")}
          />
        </>
      ),
    },
  },
};

const Template: StoryObj<ButtonProps> = {
  render: (args) => <Button {...args} />,
};

export const Primary: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "primary",
  },
};

export const Secondary: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "secondary",
    color: "secondary",
  },
};

export const Danger: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "danger",
    color: "danger",
  },
};

export const Clear: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "clear",
    color: "clear",
  },
};

export const Small: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "small",
    size: "small",
  },
};

export const Medium: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "medium",
    size: "medium",
  },
};

export const Large: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "large",
    size: "large",
  },
};

export const Disabled: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "disabled",
    disabled: true,
  },
};

export const UseHrefProps: StoryObj<ButtonProps> = {
  ...Template,
  args: {
    children: "use href props",
    href: "https://www.google.com",
  },
};
