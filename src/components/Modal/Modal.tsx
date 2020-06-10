import * as React from "react";
import * as Styled from "./styled";
import Portal from "../Portal";

type Props = {
  hasBackground?: boolean;
};

const Modal: React.FunctionComponent<Props> = ({
  hasBackground = false,
  children,
}) => (
  <Portal>
    {hasBackground && <Styled.ModalBackground />}
    <Styled.Container>{children}</Styled.Container>
  </Portal>
);

export default Modal;
