import React from "react";
import { Story } from "@storybook/react/types-6-0";
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

export const Example: Story<SpinnerProps> = (args) => <Spinner {...args} />;
