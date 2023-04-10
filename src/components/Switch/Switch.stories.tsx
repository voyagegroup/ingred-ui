import * as React from "react";
import { StoryObj } from "@storybook/react";
import Switch from "./Switch";

export default {
  title: "Components/Inputs/Switch",
  component: Switch,
};

export const Example: StoryObj = {
  render: () => {
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
  },
};

export const WithIcon: StoryObj = {
  render: () => {
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
  },
};

export const WithValue: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: "`cases` props can include `value`.",
      },
    },
  },
  render: () => {
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
  },
};
