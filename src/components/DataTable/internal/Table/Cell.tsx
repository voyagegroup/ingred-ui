import * as React from "react";
import styled from "styled-components";

import { Size } from "../../../../styles/size";

type CellProps = {
  width: string;
  enableRuledLine: boolean;
};

const Component = styled.td<CellProps>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing}px
    ${({ theme }) => theme.spacing * 3}px ${({ theme }) => theme.spacing}px
    ${({ theme }) => theme.spacing * 2}px;
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
  border-right: ${({ theme, enableRuledLine }) =>
    enableRuledLine
      ? `${Size.Border.Small} solid ${theme.palette.gray.light}`
      : "none"};

  &:last-of-type {
    border-right: none;
  }
`;

export type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> & {
  width?: string;
  enableRuledLine?: boolean;
  children?: React.ReactNode;
};

export const Cell: React.FunctionComponent<Props> = ({
  width = "auto",
  enableRuledLine = false,
  children,
  ...rest
}) => {
  return (
    <Component width={width} enableRuledLine={enableRuledLine} {...rest}>
      {children}
    </Component>
  );
};
