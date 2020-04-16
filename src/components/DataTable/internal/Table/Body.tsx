import * as React from "react";

export type Props = {};

export const Body: React.FunctionComponent<Props> = ({ children }) => (
  <tbody>{children}</tbody>
);
