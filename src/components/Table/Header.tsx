import * as React from "react";

export type Props = {};

export const Header = React.forwardRef<HTMLTableSectionElement, Props>(
  ({ children }, ref) => <thead ref={ref}>{children}</thead>,
);
