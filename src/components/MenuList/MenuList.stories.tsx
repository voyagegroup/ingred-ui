import React from "react";
import { MenuList } from "./index";
import { action } from "@storybook/addon-actions";

export default {
  title: "MenuList",
  component: MenuList,
};

export const Basic = () => {
  const contents = [
    {
      text: "保存する",
      onClick: action("clicked '保存する'"),
    },
    {
      text: "保存して実行する",
      onClick: action("clicked '保存して実行する'"),
    },
    {
      text: "下書きとして保存する",
      onClick: action("clicked '下書きとして保存する'"),
    },
  ];
  return <MenuList contents={contents} />;
};
