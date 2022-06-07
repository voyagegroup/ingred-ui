import * as React from "react";

export type Props = {
  children: React.ReactNode;
};

export const Header: React.FunctionComponent<Props> = ({ children }) => (
  <thead>{children}</thead>
);
