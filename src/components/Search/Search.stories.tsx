import * as React from "react";
import Search from "./Search";

export default {
  title: "Components/Utils/Search",
  component: Search,
};

export const Example = () => {
  // const [data, setData] = React.useState<any[]>([{}]);
  const [isOpen, setIsOpen] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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
      inputValue={inputValue}
      perPage={10}
      total={data.length}
      isLoading={isLoading}
      data={data}
      tabData={tabData}
      handleToggleOpen={handleToggleOpen}
      isOpen={isOpen}
      onChange={setInputValue}
    />
  );
};
