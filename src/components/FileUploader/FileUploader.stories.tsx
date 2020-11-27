import * as React from "react";
import FileUploader from "./index";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";

export default {
  title: "FileUploader",
  component: FileUploader,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const Overview = () => {
  const title = text(
    "Title",
    "ドラッグ&ドロップするか、クリックしてアップロード",
  );
  const description = text("Description", "ファイル容量3MBまで");
  return (
    <FileUploader
      description={description}
      title={title}
      accept="image/*"
      onSelectFiles={action("onSelectFiles")}
    />
  );
};
