import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ErrorText from "./ErrorText";
import { Title, Stories } from "@storybook/blocks";

export default {
  title: "Components/Data Display/ErrorText",
  component: ErrorText,
  args: {
    children: "Error",
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
} as Meta<typeof ErrorText>;

export const Example: StoryObj<typeof ErrorText> = {};
