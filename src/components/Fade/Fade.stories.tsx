import * as React from "react";
import styled from "styled-components";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { number } from "@storybook/addon-knobs";
import Fade from "./index";
import Flex from "../Flex";
import ToggleButton from "../ToggleButton";
import Spacer from "../Spacer";

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export default {
  title: "Components/Utils/Fade",
  component: Fade,
  parameters: {
    docs: { page: null },
  },
};

const BaseComponent: React.FunctionComponent<{
  FadeTimeout: CSSTransitionProps["timeout"];
}> = ({ FadeTimeout }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex
      display="flex"
      height="500px"
      flexDirection="column"
      alignItems="center"
    >
      <Spacer pt={3} />
      <ToggleButton active={isOpen} onChange={handleToggle} />
      <Spacer pt={3} />
      <Fade timeout={FadeTimeout} in={isOpen}>
        <Box />
      </Fade>
    </Flex>
  );
};

export const Overview: React.FunctionComponent = () => {
  const timeout = number("Timeout", 300);
  return <BaseComponent FadeTimeout={timeout} />;
};

export const DifferentInOut = () => {
  const enter = number("EnterTimeout", 300);
  const exit = number("ExitTimeout", 300);
  return <BaseComponent FadeTimeout={{ enter, exit }} />;
};
