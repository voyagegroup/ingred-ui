import React from "react";
import styled from "styled-components";
import Typography from "../Typography";

const Component = styled.th<{ width: string }>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
`;

export type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
  width?: string;
  children?: React.ReactNode;
};

export const HeaderCell: React.FunctionComponent<TableHeaderCellProps> = ({
  width = "auto",
  children,
  ...rest
}) => {
  return (
    <Component width={width} {...rest}>
      <Typography component="div" weight="bold" size="md" lineHeight="normal">
        {children}
      </Typography>
    </Component>
  );
};
