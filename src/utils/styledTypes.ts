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
  onKeyDown?: React.KeyboardEventHandler<HTMLElement> | ((event?: React.KeyboardEvent<HTMLElement>) => void);
  onTransitionEnd?: () => void;
  ref?: React.Ref<any>;
  style?: React.CSSProperties;
  tabIndex?: number;
  "aria-expanded"?: boolean | "true" | "false";
  "aria-controls"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-hidden"?: boolean | "true" | "false";
  "aria-disabled"?: boolean | "true" | "false";
  "aria-selected"?: boolean | "true" | "false";
  "aria-checked"?: boolean | "true" | "false";
  "aria-current"?: boolean | "true" | "false" | "page" | "step" | "location" | "date" | "time";
  "aria-haspopup"?: boolean | "true" | "false" | "menu" | "listbox" | "tree" | "grid" | "dialog";
  "aria-pressed"?: boolean | "true" | "false" | "mixed";
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
  "aria-busy"?: boolean | "true" | "false";
  "aria-live"?: "off" | "assertive" | "polite";
  "aria-atomic"?: boolean | "true" | "false";
  "aria-relevant"?: "additions" | "additions text" | "all" | "removals" | "text";
  "aria-roledescription"?: string;
  "aria-valuemin"?: number;
  "aria-valuemax"?: number;
  "aria-valuenow"?: number;
  "aria-valuetext"?: string;
  "aria-details"?: string;
  "aria-errormessage"?: string;
  "aria-keyshortcuts"?: string;
  "aria-modal"?: boolean | "true" | "false";
  "aria-multiline"?: boolean | "true" | "false";
  "aria-multiselectable"?: boolean | "true" | "false";
  "aria-orientation"?: "horizontal" | "vertical";
  "aria-placeholder"?: string;
  "aria-readonly"?: boolean | "true" | "false";
  "aria-required"?: boolean | "true" | "false";
  "aria-sort"?: "none" | "ascending" | "descending" | "other";
  "aria-level"?: number;
  "aria-posinset"?: number;
  "aria-setsize"?: number;
  "aria-colcount"?: number;
  "aria-colindex"?: number;
  "aria-colspan"?: number;
  "aria-rowcount"?: number;
  "aria-rowindex"?: number;
  "aria-rowspan"?: number;
  "data-testid"?: string;
};
