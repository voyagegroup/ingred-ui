import * as React from "react";

export type Props = {};

export const Header: React.FunctionComponent<Props> = ({ children }) => (
  <thead>{children}</thead>
);
