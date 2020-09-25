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
  const duration = number("Duration", 300);
  return (
    <Fade duration={duration} in={isOpen}>
      <Button>Control in Knob Footer</Button>
    </Fade>
  );
};
