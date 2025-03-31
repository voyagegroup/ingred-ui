import React from "react";

/**
 * Utility type for styled components to support React 19
 * Adds common props that styled components need to accept
 */
export type StyledComponentProps = {
  children?: React.ReactNode;
  className?: string;
  role?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  onKeyDown?: (event?: React.KeyboardEvent<HTMLElement>) => void;
  onTransitionEnd?: () => void;
  ref?: React.Ref<any>;
  style?: React.CSSProperties;
  tabIndex?: number;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};
