import React from "react";
import { Story } from "@storybook/react/types-6-0";
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
      source: { type: "code" },
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

export const Example: Story<ErrorTextProps> = (args) => <ErrorText {...args} />;
