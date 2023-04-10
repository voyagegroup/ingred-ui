import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
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
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description
            markdown={
              "Flex can easier express CSS that related flexbox with simple props."
            }
          />
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
