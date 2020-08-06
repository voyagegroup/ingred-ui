import * as React from "react";
import styled from "styled-components";
import { Border } from "../../styles";

const Component = styled.tr`
  border: ${Border.Small} solid ${({ theme }) => theme.palette.divider};
`;

export type Props = React.ComponentPropsWithRef<"tr">;

export const Row: React.FunctionComponent<Props> = ({ children, ...rest }) => (
  <Component {...rest}>{children}</Component>
);
