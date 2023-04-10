import React from "react";
import { StoryObj } from "@storybook/react";
import FileUploader, { FileUploaderProps } from "./index";

export default {
  title: "Components/Inputs/FileUploader",
  component: FileUploader,
  argTypes: {
    onSelectFiles: { action: "select file" },
  },
};

export const Example: StoryObj<FileUploaderProps> = {
  args: {
    title: "Click or Drag & Drop file.",
    description: "description",
  },
};
