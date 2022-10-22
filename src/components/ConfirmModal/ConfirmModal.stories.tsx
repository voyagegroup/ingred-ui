import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import ConfirmModal, { ConfirmModalProps } from "./ConfirmModal";
import { action } from "@storybook/addon-actions";
import Button from "../Button";
import DataTable from "../DataTable";
import { data } from "../DataTable/mockData";
import Spacer from "../Spacer";

export default {
  title: "Components/Utils/ConfirmModal",
  component: ConfirmModal,
  args: {
    isOpen: false,
    title: "Title",
  },
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={ConfirmModal} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Basic: Story<ConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        onSubmit={action("submitted")}
        onClose={handleToggleButton}
        {...args}
        isOpen={isOpen}
      >
        Content
      </ConfirmModal>
    </>
  );
};

export const FullSize: Story<ConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        fullSize={true}
        onSubmit={action("submitted")}
        onClose={handleToggleButton}
        {...args}
        isOpen={isOpen}
      >
        Content
      </ConfirmModal>
    </>
  );
};

export const WithTips: Story<ConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        tipElement={<div>Description for this modal.</div>}
        onSubmit={action("submitted")}
        onClose={handleToggleButton}
        {...args}
        isOpen={isOpen}
      >
        Content
      </ConfirmModal>
    </>
  );
};

export const WithSubactions: Story<ConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        onClose={handleToggleButton}
        onSubmit={action("submitted")}
        {...args}
        fullSize={true}
        subActions={[
          {
            title: "Download in CSV format",
            icon: "export",
            action: () => {},
          },
          {
            title: "Add to dashboard",
            icon: "export",
            action: () => {},
          },
        ]}
        isOpen={isOpen}
      >
        Content
      </ConfirmModal>
    </>
  );
};

export const Loading: Story<ConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        loading={true}
        onClose={handleToggleButton}
        {...args}
        isOpen={isOpen}
        onSubmit={() => {}}
      >
        Content
      </ConfirmModal>
    </>
  );
};

export const OverflowYScroll: Story<ConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        overflowYScroll={true}
        onClose={handleToggleButton}
        onSubmit={action("submitted")}
        {...args}
        isOpen={isOpen}
      >
        <Spacer my={2} />
        <DataTable
          data={data}
          columns={[
            {
              name: "ID",
              selector: (data) => data.id,
            },
            {
              name: "name",
              selector: (data) => data.date,
            },
          ]}
        />
      </ConfirmModal>
    </>
  );
};

export const WithoutFooter: Story<ConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        onClose={handleToggleButton}
        onSubmit={undefined}
        {...args}
        isOpen={isOpen}
      >
        Content
      </ConfirmModal>
    </>
  );
};
