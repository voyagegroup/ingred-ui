import React from "react";
import * as Styled from "./styled";
import { NavigationRailContext } from "../utils";

type Props = {
  defaultFixed?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onFixed?: () => void;
  onUnFixed?: () => void;
  children: React.ReactNode;
};

const NavigationRailContainer: React.FC<Props> = ({
  defaultFixed = false,
  onOpen,
  onClose,
  onFixed,
  onUnFixed,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultFixed);
  const [isFixed, setIsFixed] = React.useState<boolean>(defaultFixed);

  const onHandleOpen = () => {
    if (!isFixed) {
      setIsOpen(true);
      if (onOpen) onOpen();
    }
  };

  const onHandleClose = () => {
    if (!isFixed) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const onHandleFixed = () => {
    setIsFixed(true);
    if (onFixed) onFixed();
  };

  const onHandleUnFixed = () => {
    setIsFixed(false);
    if (onUnFixed) onUnFixed();
  };

  return (
    <NavigationRailContext.Provider
      value={{
        isOpen,
        isFixed,
        onHandleOpen,
        onHandleClose,
        onHandleFixed,
        onHandleUnFixed,
      }}
    >
      <Styled.Container>{children}</Styled.Container>
    </NavigationRailContext.Provider>
  );
};

export { NavigationRailContainer };
