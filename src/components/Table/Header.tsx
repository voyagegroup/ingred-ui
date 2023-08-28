import * as React from "react";

export type Props = {
  children: React.ReactNode;
};

export const Header = React.forwardRef<HTMLTableSectionElement, Props>(
  function Header({ children }, ref) {
    return <thead ref={ref}>{children}</thead>;
  },
);
