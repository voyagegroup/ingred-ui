import * as React from "react";
// import { Story } from "@storybook/react/types-6-0";
import Tabs from "../Tab";

export default {
  title: "Components/Utils/Tab",
  component: Tabs,
};

export const Example = () => {
  const [value, setValue] = React.useState("日別");
  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    newValue: string,
  ) => {
    setValue(newValue);
  };
  const options = {
    data: [{ text: "日別" }, { text: "月別" }],
  };

  return <Tabs {...options} value={value} onChange={handleChange} />;
};

export const WithBadge = () => {
  const [value, setValue] = React.useState("全て");
  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    newValue: string,
  ) => {
    setValue(newValue);
  };
  const options = {
    data: [
      { text: "全て", count: 5 },
      { text: "ユニット", count: 5 },
      { text: "サイズ", count: 5 },
    ],
  };

  return (
    <Tabs {...options} value={value} withBadge={true} onChange={handleChange} />
  );
};
