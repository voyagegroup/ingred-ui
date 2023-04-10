import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import Spinner, { SpinnerProps } from "./Spinner";

export default {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      source: { type: "code" },
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
