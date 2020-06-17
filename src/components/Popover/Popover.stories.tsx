import * as React from "react";
import styled from "styled-components";
import { select, number } from "@storybook/addon-knobs";
import Popover from "./Popover";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
`;

const BaseElement = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;

export default {
  title: "Popover",
  parameters: {
    component: Popover,
  },
};

export const Overview = () => {
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
  const offsetX = number("Offset X", 0);
  const offsetY = number("Offset Y", 10);

  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLDivElement | null>(null);

  return (
    <Container>
      <BaseElement ref={setButtonElement}>Base element</BaseElement>
      <Popover
        baseElement={buttonElement}
        positionPriority={[position]}
        offset={[offsetX, offsetY]}
      >
        <Content>hoge</Content>
      </Popover>
    </Container>
  );
};
