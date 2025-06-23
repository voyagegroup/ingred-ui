import React from "react";
import * as Styled from "./styled";
import { NavigationRailContext } from "../utils";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { BreakPoint } from "../../../styles/breakPoint";

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
>(function NavigationRailContainer(
  { defaultFixed = false, onChangeOpen, onChangeFixed, children },
  ref,
) {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultFixed);
  const [isFixed, setIsFixed] = React.useState<boolean>(defaultFixed);

  // Mobile detection and state
  const isMobile = useMediaQuery(`(max-width: ${BreakPoint.MOBILE}px)`);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState<boolean>(false);

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
    setIsOpen(true);
    setIsFixed(true);
    if (onChangeFixed) onChangeFixed(true);
  };

  const handleUnFixed = () => {
    setIsOpen(false);
    setIsFixed(false);
    if (onChangeFixed) onChangeFixed(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavigationRailContext.Provider
      value={{
        isOpen,
        isFixed,
        handleOpen,
        handleClose,
        handleFixed,
        handleUnFixed,
        isMobile,
        isMobileMenuOpen,
        handleMobileMenuToggle,
      }}
    >
      <Styled.Container ref={ref}>{children}</Styled.Container>
    </NavigationRailContext.Provider>
  );
});

export { NavigationRailContainer };
