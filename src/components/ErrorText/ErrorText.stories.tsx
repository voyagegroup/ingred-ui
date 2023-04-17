import React from "react";
import { StoryObj } from "@storybook/react";
import ErrorText, { ErrorTextProps } from "./ErrorText";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";

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
          <ArgsTable of={ErrorText} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<ErrorTextProps> = {};
