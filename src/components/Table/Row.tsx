import * as React from "react";
import styled from "styled-components";
import { Size } from "../../styles";

const Component = styled.tr`
  border: ${Size.Border.Small} solid ${({ theme }) => theme.palette.divider};
`;

export type Props = React.ComponentPropsWithRef<"tr">;

export const Row: React.FunctionComponent<Props> = ({ children, ...rest }) => (
  <Component {...rest}>{children}</Component>
);
