import * as React from "react";
// import { Story } from "@storybook/react/types-6-0";
import Search from "./Search";

export default {
  title: "Components/Utils/Search",
  component: Search,
};

export const Example = () => {
  // ここデフォルトでは false にする
  const [isOpen, setIsOpen] = React.useState(true);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const data = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      category: "size",
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      category: "size",
    },
    {
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      category: "unit",
    },
    {
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      category: "unit",
    },
  ];

  const tabData = [
    { text: "全て", count: data.length, value: "all" },
    {
      text: "ユニット",
      count: data.filter((d) => d.category == "unit").length,
      value: "unit",
    },
    {
      text: "サイズ",
      count: data.filter((d) => d.category == "size").length,
      value: "size",
    },
  ];

  return (
    <Search
      data={data}
      tabData={tabData}
      handleToggleOpen={handleToggleOpen}
      isOpen={isOpen}
      onChange={(value) => console.log(value)}
    />
  );
};
