import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import Modal, { ModalProps } from "./Modal";
import Button from "../Button";
import Fade from "../Fade";

export default {
  title: "Components/Utils/Modal",
  component: Modal,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={Modal} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: Story<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleOpen}>Toggle Show Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={handleToggleOpen}>
        <Fade in={isOpen}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "50vw",
              height: "50vh",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>This is Modal.</div>
            <Button inline={true} onClick={handleToggleOpen}>
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
