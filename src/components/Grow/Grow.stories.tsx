import { Stories, Title } from "@storybook/addon-docs";
import { Markdown } from "@storybook/blocks";
import { ComponentStory } from "@storybook/react";
import React from "react";
import Flex from "../Flex";
import Spacer from "../Spacer";
import ToggleButton from "../ToggleButton";
import Grow from "./Grow";

export default {
  title: "Components/Utils/Grow",
  component: Grow,
  args: {
    in: true,
    timeout: 300,
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {[
              "The wrapper of `<CSSTransition />` that implemented in [react-transition-group](https://reactcommunity.org/react-transition-group).",
              "",
              "It makes easy to implement CSS transitions that uses `opacity`.",
              "",
              "Props type is same as [this](https://reactcommunity.org/react-transition-group/transition#Transition-props).",
            ].join("\n")}
          </Markdown>
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: ComponentStory<typeof Grow> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.in);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Flex display="flex" flexDirection="column" alignItems="center">
      <Spacer pt={3} />
      <ToggleButton checked={isOpen} onChange={handleToggle} />
      <Spacer pt={3} />
      <Grow {...args} in={isOpen}>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "blue",
          }}
        />
      </Grow>
    </Flex>
  );
};
