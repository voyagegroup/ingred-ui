import * as React from "react";
import styled from "styled-components";
import { Size } from "../../../../styles";

export type Props = {};

const Component = styled.thead`
  border-top: ${Size.Border.Small} solid ${({ theme }) => theme.palette.divider};
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.gray.highlight};
`;

export const Header: React.FunctionComponent<Props> = ({ children }) => (
  <Component>{children}</Component>
);
