import * as React from "react";
import styled from "styled-components";
import FixedPanel from "./index";
import Flex from "../Flex";
import Button from "../Button";
import Spacer from "../Spacer";
import { select, boolean, number } from "@storybook/addon-knobs";

export default {
  title: "Components/Navigation/FixedPanel",
  component: FixedPanel,
  parameters: {
    docs: { page: null },
  },
};

const Container = styled.div`
  width: 100%;
  height: 200vh;
  background-color: ${({ theme }) => theme.palette.background.dark};
  overflow: hidden;
`;

export const Overview: React.FunctionComponent = () => {
  const buttonContainerRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!buttonContainerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      setIsOpen(!entries[0].isIntersecting);
    });
    observer.observe(buttonContainerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [buttonContainerRef]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const keepShow = boolean("Keep Show", false);
  const offset = number("Offset", 0);
  const placement = select(
    "Placement",
    {
      top: "top",
      bottom: "bottom",
    },
    "top",
  );

  return (
    <Container>
      <FixedPanel
        offset={offset}
        placement={placement}
        isOpen={isOpen || keepShow}
      >
        <Flex display="flex" justifyContent="flex-end">
          <Spacer py={2}>
            <Button>Do Something!</Button>
          </Spacer>
        </Flex>
      </FixedPanel>
      <Spacer pt={10} />
      <Flex display="flex" justifyContent="center">
        <div ref={buttonContainerRef}>
          <Button onClick={handleClick}>
            Appear panel when hiding this element
          </Button>
        </div>
      </Flex>
    </Container>
  );
};
