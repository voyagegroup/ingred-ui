import * as React from "react";

export type NavigationRailContextValues = {
  isOpen: boolean;
  isFixed: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
  handleFixed?: () => void;
  handleUnFixed?: () => void;
  handleHoverFixture?: () => void;
  handleLeaveFixture?: () => void;
  handleClickFixture?: () => void;
};

export const NavigationRailContext =
  React.createContext<NavigationRailContextValues>({
    isOpen: false,
    isFixed: false,
  });
