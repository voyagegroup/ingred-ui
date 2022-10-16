import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
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
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={Popover} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: Story<PopoverProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const [buttonElement, setButtonElement] = React.useState<HTMLElement | null>(
    null,
  );

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Spacer mt={16} />
      <Flex display="flex" justifyContent={"center"}>
        <Button ref={setButtonElement} onClick={handleToggleOpen}>
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
};
