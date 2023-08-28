import * as React from "react";

export type Props = React.ComponentPropsWithoutRef<"tbody">;

export const Body = React.forwardRef<HTMLTableSectionElement, Props>(
  function Body({ children, ...rest }, ref) {
    return (
      <tbody ref={ref} {...rest}>
        {children}
      </tbody>
    );
  },
);
