import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, ArgsTable } from "@storybook/addon-docs";
import Flex from "../Flex";
import Spacer from "../Spacer";
import Button from "../Button";
import FixedPanel, { FixedPanelProps } from "./FixedPanel";

export default {
  title: "Components/Navigation/FixedPanel",
  component: FixedPanel,
  args: {
    isOpen: false,
    placement: "top",
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description
            markdown={[
              "It implement like ”Header/Footer” UI that is styled `position: fixed;`.",
              "",
              "Usage example is included in ”Canvas” Tab at header.",
            ].join("\n")}
          />
          <ArgsTable of={FixedPanel} />
        </>
      ),
    },
  },
};

export const Example: StoryObj<FixedPanelProps> = {
  render: (args) => {
    const buttonContainerRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(args.isOpen);
    React.useEffect(() => {
      if (!buttonContainerRef.current) return;
      const observer = new IntersectionObserver((entries) => {
        setIsOpen(!entries[0].isIntersecting);
      });
      observer.observe(buttonContainerRef.current);
      return () => {
        observer.disconnect();
      };
    }, [buttonContainerRef, args]);
    const handleClick = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div style={{ height: "200vh" }}>
        <FixedPanel {...args} isOpen={isOpen || args.isOpen}>
          <Flex display="flex" justifyContent="flex-end">
            <Spacer py={2}>
              <Button>Do Something!</Button>
            </Spacer>
          </Flex>
        </FixedPanel>
        <Spacer pt={10} />
        <Flex display="flex" flexDirection="column" alignItems="center" gap={5}>
          <div ref={buttonContainerRef}>
            <Button onClick={handleClick}>
              Appear panel when hiding this element
            </Button>
          </div>
          <p>Source code is written in &rdquo;Story&rdquo; Tab at footer.</p>
        </Flex>
      </div>
    );
  },
};
