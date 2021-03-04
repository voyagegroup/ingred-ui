import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import FileUploader, { FileUploaderProps } from "./index";

export default {
  title: "Components/Inputs/FileUploader",
  component: FileUploader,
  argTypes: {
    onSelectFiles: { action: "select file" },
  },
};

export const Example: Story<FileUploaderProps> = (args) => (
  <FileUploader {...args} />
);

Example.args = {
  title: "Click or Drag & Drop file.",
  description: "description",
};
