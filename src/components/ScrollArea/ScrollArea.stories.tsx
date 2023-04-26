import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import ScrollArea, { ScrollAreaProps } from "./ScrollArea";
import Spacer from "../Spacer";

export default {
  title: "Components/Utils/ScrollArea",
  component: ScrollArea,
  args: {
    height: "300px",
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Description
            markdown={[
              "Show scroll bar.",
              "",
              "**※Only for Mac x Chromium**",
            ].join("\n")}
          />
          <ArgsTable of={ScrollArea} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj<ScrollAreaProps> = {
  render: (args) => (
    <div style={{ border: "1px solid black" }}>
      <ScrollArea {...args}>
        <Spacer p={5}>
          <p style={{ fontSize: "28px", lineHeight: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Spacer>
      </ScrollArea>
    </div>
  ),
};
