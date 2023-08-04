import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { StoryObj } from "@storybook/react";
import React from "react";
import LoadingBar from "./LoadingBar";

export default {
  title: "Components/Feedback/LoadingBar",
  component: LoadingBar,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={LoadingBar} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<typeof LoadingBar> = {
  render: (args) => (
    <div style={{ padding: "24px", backgroundColor: "silver" }}>
      <LoadingBar {...args} />
    </div>
  ),
};
