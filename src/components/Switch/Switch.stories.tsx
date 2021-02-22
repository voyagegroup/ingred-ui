import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import Switch from "./Switch";

export default {
  title: "Components/Inputs/Switch",
  component: Switch,
};

export const Example = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <Switch
      value={index}
      cases={[
        { name: "One" },
        { name: "Two" },
        { name: "Three" },
        { name: "Four" },
      ]}
      onChange={setIndex}
    />
  );
};

export const WithIcon = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <Switch
      value={index}
      cases={[
        { name: "Alert", icon: "alart" },
        { name: "Auction", icon: "auction" },
        { name: "Dashboard", icon: "dashboard" },
      ]}
      onChange={setIndex}
    />
  );
};

export const WithValue: Story = () => {
  const [value, setValue] = React.useState<number>(1);
  return (
    <Switch
      value={value}
      cases={[
        { name: "One", value: 1 },
        { name: "Two", value: 2 },
        { name: "Three", value: 3 },
        { name: "Four", value: 4 },
      ]}
      onChange={setValue}
    />
  );
};

WithValue.parameters = {
  docs: {
    description: {
      story: "`cases` props can include `value`.",
    },
  },
};
