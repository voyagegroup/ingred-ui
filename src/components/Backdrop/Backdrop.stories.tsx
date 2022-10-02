import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import Backdrop, { BackdropProps } from "./";
import Spinner from "../Spinner";
import Button from "../Button";

export default {
  title: "Components/Feedback/Backdrop",
  components: Backdrop,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={Backdrop} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: Story<BackdropProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggle}>Toggle Show Backdrop & Spinner</Button>
      <Backdrop {...args} isOpen={isOpen || args.isOpen} onClick={handleToggle}>
        <Spinner />
      </Backdrop>
    </>
  );
};
