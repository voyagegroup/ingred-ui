import * as React from "react";

export type NavigationRailContextValues = {
  isOpen: boolean;
  isFixed: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
  handleFixed?: () => void;
  handleUnFixed?: () => void;
  // Mobile-specific properties
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  handleMobileMenuToggle?: () => void;
};

export const NavigationRailContext =
  React.createContext<NavigationRailContextValues>({
    isOpen: false,
    isFixed: false,
    isMobile: false,
    isMobileMenuOpen: false,
  });
