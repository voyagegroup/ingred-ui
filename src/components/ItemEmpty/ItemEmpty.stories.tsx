import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { StoryObj } from "@storybook/react";
import React from "react";
import ItemEmpty, { ItemEmptyProps } from "./ItemEmpty";

export default {
  title: "Components/Utils/ItemEmpty",
  component: ItemEmpty,
  args: {
    title: "There is not items.",
    subtitle: "this is subtitle.",
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={ItemEmpty} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<ItemEmptyProps> = {};
