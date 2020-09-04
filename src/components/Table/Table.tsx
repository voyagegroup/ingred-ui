import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row, VerticalSpacing } from "./Row";
import { HeaderCell } from "./HeaderCell";

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export type Props = React.ComponentPropsWithRef<"table"> &
  Partial<{ verticalSpacing: VerticalSpacing }>;

const Table = ({ children }: Props) => <Container>{children}</Container>;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.HeaderCell = HeaderCell;

export default Table;
