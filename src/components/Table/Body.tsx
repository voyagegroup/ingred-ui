import * as React from "react";

export type Props = React.ComponentPropsWithoutRef<"tbody">;

export const Body = React.forwardRef<HTMLTableSectionElement, Props>(
  ({ children, ...rest }, ref) => (
    <tbody ref={ref} {...rest}>
      {children}
    </tbody>
  ),
);
