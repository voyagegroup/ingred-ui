import * as React from "react";
import * as Styled from "./styled";
import Portal from "../Portal";

type Props = {};

const Modal: React.FunctionComponent<Props> = ({ children }) => (
  <Portal>
    <Styled.Container>{children}</Styled.Container>
  </Portal>
);

export default Modal;
