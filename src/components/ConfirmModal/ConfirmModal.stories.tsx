import { action } from "@storybook/addon-actions";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { StoryObj } from "@storybook/react";
import React from "react";
import ActionButton from "../ActionButton";
import Button from "../Button";
import DataTable from "../DataTable";
import { data } from "../DataTable/mockData";
import Spacer from "../Spacer";
import ConfirmModal, { ConfirmModalProps } from "./ConfirmModal";

export default {
  title: "Components/Utils/ConfirmModal",
  component: ConfirmModal,
  args: {
    isOpen: false,
    title: "Title",
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
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

const Template: StoryObj<ConfirmModalProps> = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.isOpen);
    const handleToggleButton = () => {
      setIsOpen(!isOpen);
    };
    return (
      <>
        <Button onClick={handleToggleButton}>Open Modal</Button>
        <ConfirmModal onClose={handleToggleButton} {...args} isOpen={isOpen}>
          {args.children}
        </ConfirmModal>
      </>
    );
  },
};

export const Basic = {
  ...Template,
  args: {
    children: "Content",
    onSubmit: action("submitted"),
  },
};

export const WithOneSubAction = {
  ...Template,
  args: {
    children: "Content",
    onSubmit: action("submitted"),
    subActions: [
      <ActionButton
        icon="export"
        type="button"
        onClick={action(`clicked "Add"`)}
      >
        Add
      </ActionButton>,
    ],
  },
};

export const WithTwoSubActions = {
  ...Template,
  children: "Content",
  onSubmit: action("submitted"),
  subActions: [
    <ActionButton icon="export" type="button" onClick={action(`clicked "Add"`)}>
      Add
    </ActionButton>,
    <ActionButton
      icon="export"
      type="button"
      onClick={action(`clicked "Download"`)}
    >
      Download
    </ActionButton>,
  ],
};

export const Loading = {
  ...Template,
  args: { children: "Content", onSubmit: () => {}, loading: true },
};

export const OverflowYScroll = {
  ...Template,
  args: {
    children: (
      <>
        <Spacer my={3} />
        <DataTable
          data={data}
          dataKey="id"
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
      </>
    ),
    onSubmit: action("submitted"),
    overflowYScroll: true,
  },
};

export const WithoutFooter = {
  ...Template,
  args: { children: "Content", onSubmit: undefined },
};
