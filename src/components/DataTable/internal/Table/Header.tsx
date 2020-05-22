import * as React from "react";
import styled from "styled-components";
import { colors } from "../../../../styles/color";
import { Size } from "../../../../styles";

export type Props = {};

const Component = styled.thead`
  border-top: ${Size.Border.Small} solid ${colors.basic[300]};
  border-bottom: ${Size.Border.Small} solid ${colors.basic[300]};
  background-color: ${colors.basic[100]};
`;

export const Header: React.FunctionComponent<Props> = ({ children }) => (
  <Component>{children}</Component>
);
