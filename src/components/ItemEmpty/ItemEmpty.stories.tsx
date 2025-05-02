import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Stories } from "@storybook/blocks";
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
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<ItemEmptyProps> = {};
