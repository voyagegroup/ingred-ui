import * as React from "react";

export type Props = {};

export const Body = React.forwardRef<HTMLTableSectionElement, Props>(
  ({ children }, ref) => <tbody ref={ref}>{children}</tbody>,
);
