import * as React from "react";
import FileUploader from "./index";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";

export default {
  title: "FileUploader",
  component: FileUploader,
};

export const Overview = () => {
  const width = text("Width", "564px");
  const height = text("Height", "144px");
  const description = text("Description", "ファイル容量3MBまで");
  return (
    <FileUploader
      width={width}
      height={height}
      description={description}
      onSelectFile={(file) => action(`Uploaded "${file.name}"`)()}
    />
  );
};
