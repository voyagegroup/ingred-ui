import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import ScrollArea, { ScrollAreaProps } from "./ScrollArea";

export default {
  title: "Components/Utils/ScrollArea",
  component: ScrollArea,
  args: {
    height: "300px",
  },
  parameters: {
    docs: {
      source: { type: "code" },
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

export const Example: Story<ScrollAreaProps> = (args) => (
  <div style={{ border: "1px solid black" }}>
    <ScrollArea {...args}>
      <div style={{ height: "1000px" }} />
    </ScrollArea>
  </div>
);
