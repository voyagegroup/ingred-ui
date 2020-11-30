import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row } from "./Row";

type TableProps = {
  horizontalScrollable: boolean;
};

const Container = styled.table<TableProps>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: ${({ horizontalScrollable }) =>
    horizontalScrollable ? "auto" : "fixed"};
  white-space: ${({ horizontalScrollable }) =>
    horizontalScrollable ? "nowrap" : "normal"};
  & > thead > tr:first-of-type > th {
    &:first-of-type {
      border-top-left-radius: ${({ theme }) => theme.radius}px;
    }
    &:last-of-type {
      border-top-right-radius: ${({ theme }) => theme.radius}px;
    }
  }
  & > tbody > tr:first-of-type > td {
    border-top: none;
  }
`;

export type Props = TableProps & {
  children: React.ReactNode;
};

export const Table = ({ horizontalScrollable, children }: Props) => (
  <Container horizontalScrollable={horizontalScrollable}>{children}</Container>
);

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
