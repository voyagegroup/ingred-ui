import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { StoryObj } from "@storybook/react";
import React from "react";
import Spinner, { SpinnerProps } from "./Spinner";

export default {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={Spinner} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<SpinnerProps> = {};
