import * as React from "react";
import styled from "styled-components";

import Typography from "../../../Typography";
import { Size } from "../../../../styles/size";
import { colors } from "../../../../styles/color";

type CellProps = {
  width: string;
};

const StandardCell = styled.td<CellProps>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px;
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
`;

const HeaderCell = styled.th<CellProps>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px
    ${({ theme }) => theme.spacing * 2 - 2}px;
  background-color: ${colors.basic[100]};
  border-bottom: ${Size.Border.Normal} solid
    ${({ theme }) => theme.palette.gray.light};
`;

export type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> &
  React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
    header?: boolean;
    width?: string;
    children?: React.ReactNode;
  };

export const Cell: React.FunctionComponent<Props> = ({
  header = false,
  width = "auto",
  children,
  ...rest
}) => {
  const Component = header ? HeaderCell : StandardCell;
  return (
    <Component width={width} {...rest}>
      {header ? (
        <Typography color="secondary" weight="bold" size="md">
          {children}
        </Typography>
      ) : (
        children
      )}
    </Component>
  );
};
