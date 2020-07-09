import * as React from "react";
import styled from "styled-components";

import { Size } from "../../../../styles/size";

type CellProps = {
  width: string;
};

const Component = styled.td<CellProps>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px;
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
  border-right: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
`;

export type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> & {
  width?: string;
  children?: React.ReactNode;
};

export const Cell: React.FunctionComponent<Props> = ({
  width = "auto",
  children,
  ...rest
}) => {
  return (
    <Component width={width} {...rest}>
      {children}
    </Component>
  );
};
