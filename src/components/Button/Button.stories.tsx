import React from "react";
import { Story } from "@storybook/react/types-6-0";
import {
  Title,
  Subtitle,
  Description,
  ArgsTable,
  Stories,
} from "@storybook/addon-docs";
import Button, { ButtonProps } from "./";

export default {
  title: "Components/Inputs/Button",
  components: Button,
  args: {
    onClick: {
      action: "clicked",
    },
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

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "secondary",
  color: "secondary",
};

export const Danger = Template.bind({});
Danger.args = {
  children: "danger",
  color: "danger",
};

export const Clear = Template.bind({});
Clear.args = {
  children: "clear",
  color: "clear",
};

export const Small = Template.bind({});
Small.args = {
  children: "small",
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  children: "medium",
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  children: "large",
  size: "large",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "disabled",
  disabled: true,
};

export const UseHrefProps = Template.bind({});
UseHrefProps.args = {
  children: "use href props",
  href: "https://www.google.com",
};
