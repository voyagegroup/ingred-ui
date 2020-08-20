import * as React from "react";
import * as Styled from "./styled";
import Portal from "../Portal";

export type ModalProps = {
  hasBackground?: boolean;
};

const Modal: React.FunctionComponent<ModalProps> = ({
  hasBackground = false,
  children,
}) => (
  <Portal>
    <Styled.Container>
      {hasBackground && <Styled.ModalBackground />}
      {children}
    </Styled.Container>
  </Portal>
);

export default Modal;
