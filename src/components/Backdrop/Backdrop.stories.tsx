import * as React from "react";
import { boolean, number } from "@storybook/addon-knobs";
import Backdrop from "./Backdrop";
import Spinner from "../Spinner";
import Button from "../Button";

export default {
  title: "Components/Feedback/Backdrop",
  component: Backdrop,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const invisible = boolean("Invisible", false);
  const duration = number("Duration", 300);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleOpen}>Toggle Show Backdrop & Spacer</Button>
      <Backdrop
        isOpen={isOpen}
        invisible={invisible}
        transitionDuration={duration}
        onClick={handleToggleOpen}
      >
        <Spinner />
      </Backdrop>
    </>
  );
};
