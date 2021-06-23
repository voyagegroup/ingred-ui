import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row } from "./Row";
import { HeaderCell } from "./HeaderCell";

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export type TableProps = React.ComponentPropsWithoutRef<"table">;

const Table = ({ children }: TableProps) => <Container>{children}</Container>;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.HeaderCell = HeaderCell;

export default Table;
