import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import Label, { LabelProps } from ".";

export default {
  title: "Components/Data Display/Label",
  component: Label,
  args: {
    labelTitle: "sample",
  },
};

export const Example: Story<LabelProps> = (args) => <Label {...args} />;

export const CloseButton: Story<LabelProps> = (args) => {
  const handleRemove = (labelEleent: any) => {};
  return (
    <Label
      labelElement={{ name: "sample" }}
      onRemove={handleRemove}
      {...args}
    />
  );
};
