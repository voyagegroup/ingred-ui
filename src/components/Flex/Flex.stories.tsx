import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories, Markdown } from "@storybook/blocks";
import Flex from "./Flex";

const meta = {
  title: "Components/Layout/Flex",
  component: Flex,
  args: {
    display: "flex",
    justifyContent: "space-between",
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {
              "Flex can easier express CSS that related flexbox with simple props."
            }
          </Markdown>
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <Flex {...args}>
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
        />
      ))}
    </Flex>
  ),
};
