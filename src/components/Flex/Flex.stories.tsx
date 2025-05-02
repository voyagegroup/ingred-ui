import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories, Markdown } from "@storybook/blocks";
import Flex, { FlexProps } from "./Flex";

export default {
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
} as Meta<typeof Flex>;

export const Example: StoryObj<typeof Flex> = {
  render: (args: FlexProps) => (
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
