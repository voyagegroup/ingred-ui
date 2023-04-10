import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
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
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description
            markdown={[
              "It is used when we want to express something gathering of information.",
              "",
              "It can contains `<Flex />`props & `<Spacer />`props.",
            ].join("\n")}
          />
          <ArgsTable of={Card} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<CardProps> = {};
