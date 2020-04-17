import * as React from "react";
import styled from "styled-components";
import { Size } from "../../styles";

const Component = styled.td<{ width: string }>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px;
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
`;

export type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> &
  React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
    width?: string;
    children?: React.ReactNode;
  };

export const Cell: React.FunctionComponent<Props> = ({
  width = "auto",
  children,
  ...rest
}) => (
  <Component width={width} {...rest}>
    {children}
  </Component>
);
