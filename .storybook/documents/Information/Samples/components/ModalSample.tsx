import * as React from "react";
import styled from "styled-components";
import { Button, Fade, Modal, Typography } from "../../../../../src/components";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 50vh;
  transform: translate(-50%, -50%);
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalSample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Button onClick={handleToggleOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={handleToggleOpen}>
        <Fade in={isOpen}>
          <ModalContainer>
            <Typography>This is Modal sample.</Typography>
            <Button inline={true} onClick={handleToggleOpen}>
              Close
            </Button>
          </ModalContainer>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalSample;
