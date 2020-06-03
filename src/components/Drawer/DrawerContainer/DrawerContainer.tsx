import React from "react";
import * as Styled from "./styled";
import { DrawerContext } from "../utils";

type Props = {
  children: React.ReactNode;
};

const DrawerContainer: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isFixed, setIsFixed] = React.useState<boolean>(false);

  const onHandleOpen = () => {
    if (!isFixed) {
      setIsOpen(true);
    }
  };

  const onHandleClose = () => {
    if (!isFixed) {
      setIsOpen(false);
    }
  };

  const onHandleFixed = () => {
    setIsFixed(!isFixed);
    setIsOpen(!isFixed);
  };

  return (
    <DrawerContext.Provider
      value={{ isOpen, isFixed, onHandleOpen, onHandleClose, onHandleFixed }}
    >
      <Styled.Container>{children}</Styled.Container>
    </DrawerContext.Provider>
  );
};

export { DrawerContainer };
