import React from "react";
import Spacer from "../Spacer";
import Flex from "../Flex";
import Tooltip from "./Tooltip";
import { TooltipProps } from "..";
import { Story } from "@storybook/react/types-6-0";

export default {
  title: "Components/Data Display/Tooltip",
  component: Tooltip,
};

export const Example: Story<TooltipProps> = (args) => {
  return <Tooltip {...args} />;
};

Example.args = {
  children: <span>Hover me!!</span>,
  content: "Sample text",
};

export const DesignSamples = () => {
  return (
    <>
      <Flex display="flex" justifyContent="center">
        {["top-start", "top", "top-end"].map((position) => (
          <Spacer key={position} p={8}>
            <Tooltip
              open={true}
              content={position.toUpperCase()}
              positionPriority={[position as any]}
            >
              <span>{position.toUpperCase()}</span>
            </Tooltip>
          </Spacer>
        ))}
      </Flex>
      <Flex display="flex" justifyContent="space-between" alignItems="center">
        <Spacer pl={12}>
          {["left-start", "left", "left-end"].map((position) => (
            <Spacer key={position} p={4}>
              <Tooltip
                open={true}
                content={position.toUpperCase()}
                positionPriority={[position as any]}
              >
                <span>{position.toUpperCase()}</span>
              </Tooltip>
            </Spacer>
          ))}
        </Spacer>
        <Spacer pr={12}>
          {["right-start", "right", "right-end"].map((position) => (
            <Spacer key={position} p={4}>
              <Tooltip
                open={true}
                content={position.toUpperCase()}
                positionPriority={[position as any]}
              >
                <span>{position.toUpperCase()}</span>
              </Tooltip>
            </Spacer>
          ))}
        </Spacer>
      </Flex>
      <Flex display="flex" justifyContent="center">
        {["bottom-start", "bottom", "bottom-end"].map((position) => (
          <Spacer key={position} p={8}>
            <Tooltip
              open={true}
              content={position.toUpperCase()}
              positionPriority={[position as any]}
            >
              <span>{position.toUpperCase()}</span>
            </Tooltip>
          </Spacer>
        ))}
      </Flex>
    </>
  );
};
