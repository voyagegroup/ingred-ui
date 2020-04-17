import * as React from "react";
import styled from "styled-components";

const Component = styled.tr``;

export type Props = React.ComponentPropsWithRef<"tr">;

export const Row: React.FunctionComponent<Props> = ({ children, ...rest }) => (
  <Component {...rest}>{children}</Component>
);
