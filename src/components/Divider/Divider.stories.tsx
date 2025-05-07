import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories, Markdown } from "@storybook/blocks";
import Divider, { DividerProps } from "./Divider";

export default {
  title: "Components/Data Display/Divider",
  component: Divider,
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {
              "`<Divider />` is wrapper of `<hr />` tag that separate content into clear groups."
            }
          </Markdown>
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
} as Meta<typeof Divider>;

export const Normal: StoryObj<typeof Divider> = {
  render: (args: DividerProps) => <Divider {...args} />,
};

export const WithSpace: StoryObj<typeof Divider> = {
  args: {
    m: 3,
    p: 1,
  },
  render: (args: DividerProps) => <Divider {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "It can define margin and padding like [`<Spacer />`](/?path=/docs/components-layout-spacer--example).",
      },
    },
  },
};

export const OverrideColor: StoryObj<typeof Divider> = {
  args: {
    color: "red",
  },
  render: (args: DividerProps) => <Divider {...args} />,
};

export const Vertical: StoryObj<typeof Divider> = {
  render: (args: DividerProps) => (
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
