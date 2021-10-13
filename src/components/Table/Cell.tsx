import * as React from "react";
import styled from "styled-components";
import Typography from "../Typography";

const Component = styled.td<{ width: string }>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px;
`;

export type TableCellProps =
  React.TdHTMLAttributes<HTMLTableDataCellElement> & {
    width?: string;
    children?: React.ReactNode;
  };

export const Cell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ width = "auto", children, ...rest }, ref) => (
    <Component ref={ref} width={width} {...rest}>
      <Typography component="div">{children}</Typography>
    </Component>
  ),
);
