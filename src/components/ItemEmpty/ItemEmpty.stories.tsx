import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import ItemEmpty from "./ItemEmpty";

export default {
  title: "Components/Utils/ItemEmpty",
  component: ItemEmpty,
  args: {
    title: "There is not items.",
    subtitle: "this is subtitle.",
  },
  parameters: {
    docs: {
      source: { type: "code" },
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

export const Example: Story = (args) => <ItemEmpty {...args} />;
