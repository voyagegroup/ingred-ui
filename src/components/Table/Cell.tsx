import * as React from "react";
import styled from "styled-components";
import Typography from "../Typography";

const Component = styled.td<{ width: string }>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px;
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
    <Typography component="div">{children}</Typography>
  </Component>
);
