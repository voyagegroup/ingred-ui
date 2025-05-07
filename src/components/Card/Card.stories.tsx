import React from "react";
import { StoryObj } from "@storybook/react";
import { Markdown, Title, Stories } from "@storybook/blocks";
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
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<CardProps> = {};
