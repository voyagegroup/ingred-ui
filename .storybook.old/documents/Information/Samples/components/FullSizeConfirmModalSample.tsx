import * as React from "react";
import { Button, FullSizeConfirmModal } from "../../../../../src/components";
import { action } from "@storybook/addon-actions";

/* eslint-disable react/jsx-handler-names */
const FullSizeConfirmModalSample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <FullSizeConfirmModal
        isOpen={isOpen}
        title="Title"
        onClose={handleToggleButton}
        onSubmit={action("submit")}
      >
        Contents
      </FullSizeConfirmModal>
    </div>
  );
};

export default FullSizeConfirmModalSample;
