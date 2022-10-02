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

const Template: Story<ErrorTextProps> = (args) => <ErrorText {...args} />;

export const Example = Template.bind({});
