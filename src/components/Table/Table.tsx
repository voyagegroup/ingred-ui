import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row } from "./Row";
import { HeaderCell } from "./HeaderCell";
import { Radius, Size } from "../../styles";

const Container = styled.table`
  width: 100%;
  table-layout: auto;
  background-color: ${({ theme }) => theme.palette.background.default};
  border: ${Size.Border.Small} solid ${({ theme }) => theme.palette.divider};
  border-radius: ${Radius.SMALL};
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;

  & tr:not(:first-child) > th,
  & tr:not(:first-child) > td {
    border-top: ${Size.Border.Small} solid
      ${({ theme }) => theme.palette.divider};
  }

  & tr > th:not(:last-child),
  & tr > td:not(:last-child) {
    border-right: ${Size.Border.Small} solid
      ${({ theme }) => theme.palette.divider};
  }
`;

export type Props = {
  children: React.ReactNode;
};

const Table = ({ children }: Props) => <Container>{children}</Container>;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.HeaderCell = HeaderCell;

export default Table;
