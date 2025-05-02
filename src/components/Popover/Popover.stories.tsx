import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories } from "@storybook/blocks";
import Popover, { PopoverProps } from "./Popover";
import Spacer from "../Spacer";
import Flex from "../Flex";
import Button from "../Button";

export default {
  title: "Components/Utils/Popover",
  component: Popover,
  args: {
    isOpen: false,
    positionPriority: ["top"],
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
} as Meta<typeof Popover>;

export const Example: StoryObj<typeof Popover> = {
  render: (args: PopoverProps) => {
    const [isOpen, setIsOpen] = React.useState(args.isOpen);
    const [buttonElement, setButtonElement] =
      React.useState<HTMLElement | null>(null);

    const handleToggleOpen = () => {
      setIsOpen(!isOpen);
    };
    return (
      <>
        <Spacer mt={16} />
        <Flex display="flex" justifyContent={"center"}>
          <Button
            ref={setButtonElement}
            inline={true}
            onClick={handleToggleOpen}
          >
            Click me!
          </Button>
        </Flex>
        <Popover
          {...args}
          isOpen={isOpen}
          baseElement={buttonElement}
          onClose={handleToggleOpen}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: "100px",
              height: "100px",
            }}
          >
            hoge
          </div>
        </Popover>
      </>
    );
  },
};
