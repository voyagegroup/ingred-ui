import * as React from "react";
import { Button, ConfirmModal } from "../../../../../src/components";
import { action } from "@storybook/addon-actions";

/* eslint-disable react/jsx-handler-names */
const ConfirmModalSample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        isOpen={isOpen}
        title="Title"
        confirmText="ConfirmText"
        cancelText="CanselText"
        onClose={handleToggleButton}
        onSubmit={action("submit")}
      >
        Contents
      </ConfirmModal>
    </div>
  );
};

export default ConfirmModalSample;
