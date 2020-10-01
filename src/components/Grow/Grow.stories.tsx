import * as React from "react";
import styled from "styled-components";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { number } from "@storybook/addon-knobs";
import Grow from "./index";
import Flex from "../Flex";
import ToggleButton from "../ToggleButton";
import Spacer from "../Spacer";

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export default {
  title: "Grow",
  component: Grow,
};

const BaseComponent: React.FunctionComponent<{
  growTimeout: CSSTransitionProps["timeout"];
}> = ({ growTimeout }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  const onHandleToggle = () => {
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
      <ToggleButton active={isOpen} onChange={onHandleToggle} />
      <Spacer pt={3} />
      <Grow timeout={growTimeout} in={isOpen}>
        <Box />
      </Grow>
    </Flex>
  );
};

export const Overview: React.FunctionComponent = () => {
  const timeout = number("Timeout", 300);
  return <BaseComponent growTimeout={timeout} />;
};

export const DifferentInOut = () => {
  const enter = number("EnterTimeout", 300);
  const exit = number("ExitTimeout", 300);
  return <BaseComponent growTimeout={{ enter, exit }} />;
};
