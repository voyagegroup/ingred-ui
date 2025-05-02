import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories } from "@storybook/blocks";
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
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
} as Meta<typeof LoadingBar>;

export const Example: StoryObj<typeof LoadingBar> = {
  render: (args: React.ComponentProps<typeof LoadingBar>) => (
    <div style={{ padding: "24px", backgroundColor: "silver" }}>
      <LoadingBar {...args} />
    </div>
  ),
};
