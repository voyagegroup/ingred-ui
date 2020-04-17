import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row } from "./Row";
import { HeaderCell } from "./HeaderCell";
import { Size } from "../../styles";

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  border: ${Size.Border.Normal} solid ${({ theme }) => theme.palette.gray.light};
  background-color: ${({ theme }) => theme.palette.background.default};
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
