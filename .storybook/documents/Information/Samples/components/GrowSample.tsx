import * as React from "react";
import styled from "styled-components";
import { Grow, Spacer, ToggleButton } from "../../../../../src/components";

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const GrowSample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ToggleButton active={isOpen} onChange={handleToggle} />
      <Spacer pl={5} />
      <Grow in={isOpen}>
        <Box />
      </Grow>
    </>
  );
};

export default GrowSample;
