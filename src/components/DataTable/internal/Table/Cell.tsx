import * as React from "react";
import styled from "styled-components";

import { Size } from "../../../../styles/size";

type CellProps = {
  width: string;
  ruledLine: boolean;
};

const Component = styled.td<CellProps>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px;
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
  border-right: ${({ theme, ruledLine }) =>
    ruledLine
      ? `${Size.Border.Small} solid ${theme.palette.gray.light}`
      : "none"};

  &:first-of-type {
    border-left: ${({ theme, ruledLine }) =>
      ruledLine
        ? `${Size.Border.Small} solid ${theme.palette.gray.light}`
        : "none"};
  }
`;

export type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> & {
  width?: string;
  ruledLine?: boolean;
  children?: React.ReactNode;
};

export const Cell: React.FunctionComponent<Props> = ({
  width = "auto",
  ruledLine = false,
  children,
  ...rest
}) => {
  return (
    <Component width={width} ruledLine={ruledLine} {...rest}>
      {children}
    </Component>
  );
};
