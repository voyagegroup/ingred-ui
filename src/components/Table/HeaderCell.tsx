import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import Flex from "../Flex";
import { Size, Radius } from "../../styles";

const Component = styled.th<{ width: string }>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-right: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.divider};
`;

const RequiredBadge = styled.div`
  padding: 2px 7px;
  background: ${({ theme }) => theme.palette.danger.main};
  border-radius: ${Radius.MEDIUM};
`;

export type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> &
  React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
    width?: string;
    children?: React.ReactNode;
    required?: boolean;
  };

export const HeaderCell: React.FunctionComponent<Props> = ({
  width = "auto",
  children,
  required = false,
  ...rest
}) => {
  return (
    <Component width={width} {...rest}>
      <Flex display="flex" justifyContent="space-between">
        <Typography component="div" weight="bold" size="md">
          {children}
        </Typography>
        {required && (
          <RequiredBadge>
            <Typography color="white" weight="bold" size="xs">
              必須
            </Typography>
          </RequiredBadge>
        )}
      </Flex>
    </Component>
  );
};
