import * as React from "react";
// import { Story } from "@storybook/react/types-6-0";
import Tabs from "../Tab";

export default {
  title: "Components/Utils/Tab",
  component: Tabs,
};

export const Example = () => {
  const [value, setValue] = React.useState("日別");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const options = {
    data: [{ text: "日別" }, { text: "月別" }],
  };

  return <Tabs {...options} value={value} onChange={handleChange} />;
};

export const WithBadge = () => {
  const [value, setValue] = React.useState("hoge");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const options = {
    data: [
      { text: "hoge", count: 5 },
      { text: "fuga", count: 4 },
      { text: "other", count: 0 },
    ],
  };

  return (
    <Tabs {...options} value={value} withBadge={true} onChange={handleChange} />
  );
};
