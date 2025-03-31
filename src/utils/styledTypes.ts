import React from "react";

/**
 * Utility type for styled components to support React 19
 * Adds common props that styled components need to accept
 */
export type StyledComponentProps = {
  children?: React.ReactNode;
  className?: string;
  role?: string;
  onClick?: () => void;
  ref?: React.Ref<any>;
};
