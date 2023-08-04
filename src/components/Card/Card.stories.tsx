import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { Markdown } from "@storybook/blocks";
import { StoryObj } from "@storybook/react";
import React from "react";
import Card, { CardProps } from "./Card";

export default {
  title: "Components/Layout/Card",
  component: Card,
  args: {
    m: 1,
    p: 3,
    children: "contents",
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {[
              "It is used when we want to express something gathering of information.",
              "",
              "It can contains `<Flex />`props & `<Spacer />`props.",
            ].join("\n")}
          </Markdown>
          <ArgsTable of={Card} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<CardProps> = {};
