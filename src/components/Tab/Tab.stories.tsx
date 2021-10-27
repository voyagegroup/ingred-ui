import * as React from "react";
// import { Story } from "@storybook/react/types-6-0";
import Tabs from "../Tab";

export default {
  title: "Components/Utils/Tab",
  component: Tabs,
};

export const Example = () => {
  const [value, setValue] = React.useState('日別');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const options = {
    data: [
      { text: "日別" },
      { text: "月別" },
    ],
  };

  return (
    <Tabs
      {...options} 
      value={value} 
      onChange={handleChange}
    />
  );
};
