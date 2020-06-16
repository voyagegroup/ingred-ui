import * as React from "react";
import styled from "styled-components";

type RowProps = {
  highlighted?: boolean;
};

const Component = styled.tr<RowProps>`
  background-color: ${({ highlighted, theme }) =>
    highlighted ? theme.palette.primary.highlight : "none"};

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.highlight};
  }
`;

export type Props = React.ComponentPropsWithRef<"tr"> & {
  highlighted?: boolean;
};

export const Row: React.FunctionComponent<Props> = ({
  highlighted = false,
  children,
  ...rest
}) => (
  <Component highlighted={highlighted} {...rest}>
    {children}
  </Component>
);
