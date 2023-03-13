import React from "react";
import * as Styled from "./styled";
import { NavigationRailContext } from "../utils";

export type NavigationRailContainerProps = {
  /**
   * If `true`, it is opened as default.
   */
  defaultFixed?: boolean;
  /**
   * It can define callback function that triggered when NavigationRail is `opened`.
   */
  onChangeOpen?: (isOpen: boolean) => void;
  /**
   * It can define callback function that triggered when NavigationRail is `fixed`.
   */
  onChangeFixed?: (isFixed: boolean) => void;
  children: React.ReactNode;
};

const NavigationRailContainer = React.forwardRef<
  HTMLDivElement,
  NavigationRailContainerProps
>(({ defaultFixed = false, onChangeOpen, onChangeFixed, children }, ref) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultFixed);
  const [isFixed, setIsFixed] = React.useState<boolean>(defaultFixed);
  const [isHoverFixture, setIsHoverFixture] = React.useState<boolean>(false);

  const handleOpen = () => {
    if (!isFixed) {
      setIsOpen(true);
      if (onChangeOpen) onChangeOpen(true);
    }
  };

  const handleClose = () => {
    if (!isFixed) {
      setIsOpen(false);
      if (onChangeOpen) onChangeOpen(false);
    }
  };

  const handleFixed = () => {
    setIsFixed(true);
    if (onChangeFixed) onChangeFixed(true);
  };

  const handleUnFixed = () => {
    setIsFixed(false);
    if (onChangeFixed) onChangeFixed(false);
  };

  const handleHoverFixture = () => {
    setIsHoverFixture(true);
  };

  const handleLeaveFixture = () => {
    setIsHoverFixture(false);
  };

  const handleClickFixture = () => {
    if (isFixed) {
      if (isHoverFixture) {
        setIsOpen(false);
      }
      handleUnFixed();
    } else {
      if (isHoverFixture) {
        setIsOpen(true);
      }
      handleFixed();
    }
  };

  return (
    <NavigationRailContext.Provider
      value={{
        isOpen,
        isFixed,
        isHoverFixture,
        handleOpen,
        handleClose,
        handleFixed,
        handleUnFixed,
        handleHoverFixture,
        handleLeaveFixture,
        handleClickFixture,
      }}
    >
      <Styled.Container ref={ref}>{children}</Styled.Container>
    </NavigationRailContext.Provider>
  );
});

export { NavigationRailContainer };
