import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import FullSizeConfirmModal, {
  FullSizeConfirmModalProps,
} from "./FullSizeConfirmModal";
import { action } from "@storybook/addon-actions";
import Button from "../Button";
import DataTable from "../DataTable";
import { data } from "../DataTable/mockData";
import Spacer from "../Spacer";

export default {
  title: "Components/Utils/FullSizeConfirmModal",
  component: FullSizeConfirmModal,
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
          <ArgsTable of={FullSizeConfirmModal} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: Story<FullSizeConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <FullSizeConfirmModal
        onClose={handleToggleButton}
        {...args}
        isOpen={isOpen}
      >
        {args.children}
      </FullSizeConfirmModal>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: "Content",
  onSubmit: action("submitted"),
};

export const WithTips = Template.bind({});
WithTips.args = {
  children: "Content",
  onSubmit: action("submitted"),
  tipElement: <div>Description for this modal.</div>,
};

export const WithSubActions = Template.bind({});
WithSubActions.args = {
  children: "Content",
  onSubmit: action("submitted"),
  subActions: [
    {
      title: "Download in CSV format",
      icon: "export",
      action: action(`clicked "Download in CSV format"`),
    },
    {
      title: "Add to dashboard",
      icon: "export",
      action: action(`clicked "Add to dashboard"`),
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  children: "Content",
  onSubmit: () => {},
  loading: true,
};

export const OverflowYScroll = Template.bind({});
OverflowYScroll.args = {
  children: (
    <>
      <Spacer my={3} />
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
    </>
  ),
  onSubmit: action("submitted"),
  overflowYScroll: true,
};

export const WithoutFooter = Template.bind({});
WithoutFooter.args = {
  children: "Content",
  onSubmit: undefined,
};
