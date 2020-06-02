import * as React from "react";

export type DrawerContextValues = {
  isOpen: boolean;
  isFixed: boolean;
  onHandleOpen?: () => void;
  onHandleClose?: () => void;
  onHandleFixed?: () => void;
};

export const DrawerContext = React.createContext<DrawerContextValues>({
  isOpen: false,
  isFixed: false,
});
