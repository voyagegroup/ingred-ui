import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories } from "@storybook/blocks";
import Spinner from "./Spinner";

export default {
  title: "Components/Feedback/Spinner",
  component: Spinner,
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
} as Meta<typeof Spinner>;

export const Example: StoryObj<typeof Spinner> = {};
