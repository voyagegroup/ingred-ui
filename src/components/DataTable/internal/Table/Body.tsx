import * as React from "react";

export type Props = {
  children: React.ReactNode;
};

export const Body: React.FunctionComponent<Props> = ({ children }) => (
  <tbody>{children}</tbody>
);
