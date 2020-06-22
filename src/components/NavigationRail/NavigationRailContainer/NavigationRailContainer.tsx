import React from "react";
import * as Styled from "./styled";
import { NavigationRailContext } from "../utils";

type Props = {
  defaultFixed?: boolean;
  onChangeOpen?: (isOpen: boolean) => void;
  onChangeFixed?: (isFixed: boolean) => void;
  children: React.ReactNode;
};

const NavigationRailContainer: React.FC<Props> = ({
  defaultFixed = false,
  onChangeOpen,
  onChangeFixed,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultFixed);
  const [isFixed, setIsFixed] = React.useState<boolean>(defaultFixed);

  const onHandleOpen = () => {
    if (!isFixed) {
      setIsOpen(true);
      if (onChangeOpen) onChangeOpen(true);
    }
  };

  const onHandleClose = () => {
    if (!isFixed) {
      setIsOpen(false);
      if (onChangeOpen) onChangeOpen(false);
    }
  };

  const onHandleFixed = () => {
    setIsFixed(true);
    if (onChangeFixed) onChangeFixed(true);
  };

  const onHandleUnFixed = () => {
    setIsFixed(false);
    if (onChangeFixed) onChangeFixed(false);
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
