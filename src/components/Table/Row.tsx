import * as React from "react";

export type Props = React.ComponentPropsWithRef<"tr">;

export const Row: React.FunctionComponent<Props> = ({ children, ...rest }) => (
  <tr {...rest}>{children}</tr>
);
