import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { Markdown } from "@storybook/blocks";
import { StoryObj } from "@storybook/react";
import React from "react";
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
          <ArgsTable of={Flex} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<FlexProps> = {
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
