import * as React from "react";
import styled from "styled-components";
import { Fade, Spacer, ToggleButton } from "../../../../../src/components";

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const FadeSample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ToggleButton active={isOpen} onChange={handleToggle} />
      <Spacer pl={5} />
      <Fade in={isOpen}>
        <Box />
      </Fade>
    </>
  );
};

export default FadeSample;
