import * as React from "react";
import Fade from "./index";
import { boolean, number } from "@storybook/addon-knobs";
import Button from "../Button";

export default {
  title: "Fade",
  component: Fade,
};

export const Overview = () => {
  const isOpen = boolean("IsOpen", true);
  const timeout = number("Timeout", 300);
  return (
    <Fade timeout={timeout} in={isOpen}>
      <Button>Control in Knob Footer</Button>
    </Fade>
  );
};

export const DifferentInOut = () => {
  const isOpen = boolean("IsOpen", true);
  const enter = number("EnterTimeout", 300);
  const exit = number("ExitTimeout", 300);
  return (
    <>
      <Fade timeout={{ enter, exit }} in={isOpen}>
        <Button>Control in Knob Footer</Button>
      </Fade>
      <div>hoge</div>
    </>
  );
};
