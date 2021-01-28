import * as React from "react";
import styled from "styled-components";
import { Popover } from "../../../../../src/components";

const Content = styled.div`
  height: 100px;
  width: 100px;
`;

const PopoverSample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLButtonElement | null>(null);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button ref={setButtonElement} onClick={handleToggleOpen}>
        Click me!
      </button>
      <Popover
        isOpen={isOpen}
        baseElement={buttonElement}
        positionPriority={["top"]}
        offset={[0, 10]}
        onClose={handleToggleOpen}
      >
        <Content />
      </Popover>
    </>
  );
};

export default PopoverSample;
