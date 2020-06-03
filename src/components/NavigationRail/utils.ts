import * as React from "react";

export type NavigationRailContextValues = {
  isOpen: boolean;
  isFixed: boolean;
  onHandleOpen?: () => void;
  onHandleClose?: () => void;
  onHandleFixed?: () => void;
};

export const NavigationRailContext = React.createContext<
  NavigationRailContextValues
>({
  isOpen: false,
  isFixed: false,
});
