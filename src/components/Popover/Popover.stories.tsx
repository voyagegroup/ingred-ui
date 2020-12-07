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

export default {
  title: "Popover",
  component: Popover,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
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
  // const transitionComponent = select(
  //   "Transition",
  //   { grow: "Grow", fade: "fade" },
  //   "Grow",
  // );
  const offsetX = number("Offset X", 0);
  const offsetY = number("Offset Y", 10);

  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLButtonElement | null>(null);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <button ref={setButtonElement} onClick={handleToggleOpen}>
        Click me!
      </button>
      <Popover
        isOpen={isOpen}
        baseElement={buttonElement}
        positionPriority={[position]}
        offset={[offsetX, offsetY]}
        // MEMO: ref https://github.com/voyagegroup/ingred-ui/issues/191
        // TransitionComponent={transitionComponent === "Grow" ? Grow : Fade}
        onClose={handleToggleOpen}
      >
        <Content>hoge</Content>
      </Popover>
    </Container>
  );
};
