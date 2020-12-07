import React from "react";
import styled from "styled-components";
import { select, text, boolean, number } from "@storybook/addon-knobs";
import Spacer from "../Spacer";
import Flex from "../Flex";
import Tooltip from "./Tooltip";

export default {
  title: "Tooltip",
  component: Tooltip,
  parameters: {
    docs: { page: null },
  },
};

const TextWrapper = styled.div<{ textAlign?: string }>`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: ${({ textAlign }) => textAlign || "left"};
  font-weight: bold;
`;

export const Overview = () => {
  const tooltipText = text("ToolTip Text", "This is a tooltip text!!");
  const keepShow = boolean("Keep Show", false);
  const width = number("Width", 150);
  const offsetX = number("Offset X", 0);
  const offsetY = number("Offset Y", 10);
  const position = select(
    "Position",
    {
      top: "top",
      top_start: "top-start",
      top_end: "top-end",
      bottom: "bottom",
      bottom_start: "bottom-start",
      bottom_end: "bottom-end",
      left: "left",
      left_start: "left-start",
      left_end: "left-end",
      right: "right",
      right_start: "right-start",
      right_end: "right-end",
    },
    "top",
  );

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
              <TextWrapper>{position.toUpperCase()}</TextWrapper>
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
                <TextWrapper>{position.toUpperCase()}</TextWrapper>
              </Tooltip>
            </Spacer>
          ))}
        </Spacer>
        <Tooltip
          content={tooltipText}
          positionPriority={[position]}
          width={`${width}px`}
          offset={[offsetX, offsetY]}
          open={keepShow}
        >
          <TextWrapper textAlign="center">Hover me!!</TextWrapper>
        </Tooltip>
        <Spacer pr={12}>
          {["right-start", "right", "right-end"].map((position) => (
            <Spacer key={position} p={4}>
              <Tooltip
                open={true}
                content={position.toUpperCase()}
                positionPriority={[position as any]}
              >
                <TextWrapper textAlign="right">
                  {position.toUpperCase()}
                </TextWrapper>
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
              <TextWrapper>{position.toUpperCase()}</TextWrapper>
            </Tooltip>
          </Spacer>
        ))}
      </Flex>
    </>
  );
};
