import * as React from "react";
import styled from "styled-components";
import { Size } from "../../styles";
import { colors } from "../../styles/color";

const Component = styled.tr`
  border: ${Size.Border.Small} solid ${colors.basic[300]};
`;

export type Props = React.ComponentPropsWithRef<"tr">;

export const Row: React.FunctionComponent<Props> = ({ children, ...rest }) => (
  <Component {...rest}>{children}</Component>
);
