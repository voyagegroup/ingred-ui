import React from "react";
import { Story } from "@storybook/react/types-6-0";
import {
  Title,
  Subtitle,
  Description,
  ArgsTable,
  Stories,
} from "@storybook/addon-docs";
import Divider, { DividerProps } from "./";

export default {
  title: "Components/Data Display/Divider",
  components: Divider,
  args: {},
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description markdown="`<Divider />` is wrapper of `<hr />` tag that separate content into clear groups." />
          <ArgsTable of={Divider} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: Story<DividerProps> = (args) => <Divider {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const WithSpace = Template.bind({});
WithSpace.args = {
  m: 3,
  p: 1,
};
WithSpace.parameters = {
  docs: {
    description: {
      story:
        "It can define margin and padding like [`<Spacer />`](/?path=/docs/components-layout-spacer--example).",
    },
  },
};

export const OverrideColor = Template.bind({});
OverrideColor.args = {
  color: "red",
};

export const Vertial: Story<DividerProps> = (args) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    }}
  >
    <Divider orientation="vertical" {...args} />
  </div>
);
