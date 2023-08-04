import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Spinner from "../Spinner";
import Backdrop, { BackdropProps } from "./Backdrop";

export default {
  title: "Components/Feedback/Backdrop",
  components: Backdrop,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
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

export const Example: StoryObj<BackdropProps> = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
    return (
      <>
        <Button onClick={handleToggle}>Toggle Show Backdrop & Spinner</Button>
        <Backdrop
          {...args}
          isOpen={isOpen || args.isOpen}
          onClick={handleToggle}
        >
          <Spinner />
        </Backdrop>
      </>
    );
  },
};
