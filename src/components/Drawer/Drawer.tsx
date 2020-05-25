import React from "react";
import * as Styled from "./styled";
import { DrawerContext } from "./utils";

type Props = {};

const Drawer: React.FC<Props> = ({ children }) => {
  const { isOpen, isFixed, onHandleOpen, onHandleClose } = React.useContext(
    DrawerContext,
  );

  return (
    <Styled.Container
      isOpen={isOpen}
      isFixed={isFixed}
      onMouseEnter={onHandleOpen}
      onMouseLeave={onHandleClose}
    >
      {children}
    </Styled.Container>
  );
};

export default Drawer;
