import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Controls, Stories, Title, Markdown } from "@storybook/blocks";
import Backdrop, { BackdropProps } from "./Backdrop";
import Spinner from "../Spinner";
import Button from "../Button";

const meta: Meta<typeof Backdrop> = {
  title: "Components/Feedback/Backdrop",
  component: Backdrop,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>{"クリックで開閉できるBackdropとSpinnerのサンプルです。"}</Markdown>
          <Controls />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj<typeof Backdrop>;

export const Example: Story = {
  render: (args: Story["args"]) => {
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
