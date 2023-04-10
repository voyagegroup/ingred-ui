import React from "react";
import { StoryObj } from "@storybook/react";
import {
  Title,
  Subtitle,
  Description,
  ArgsTable,
  Stories,
} from "@storybook/addon-docs";
import Divider, { DividerProps } from "./Divider";

export default {
  title: "Components/Data Display/Divider",
  components: Divider,
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

export const Normal: StoryObj<DividerProps> = {
  render: (args) => <Divider {...args} />,
};

export const WithSpace: StoryObj<DividerProps> = {
  args: {
    m: 3,
    p: 1,
  },
  render: (args) => <Divider {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "It can define margin and padding like [`<Spacer />`](/?path=/docs/components-layout-spacer--example).",
      },
    },
  },
};

export const OverrideColor: StoryObj<DividerProps> = {
  args: {
    color: "red",
  },
  render: (args) => <Divider {...args} />,
};

export const Vertical: StoryObj<DividerProps> = {
  render: (args) => (
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
  ),
};
