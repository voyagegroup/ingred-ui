import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row } from "./Row";
import { HeaderCell } from "./HeaderCell";
import { Radius, Size } from "../../styles";
import { colors } from "../../styles/color";

const Container = styled.table`
  width: 100%;
  table-layout: auto;
  background-color: ${({ theme }) => theme.palette.background.default};
  border: ${Size.Border.Small} solid ${colors.basic[300]};
  border-radius: ${Radius.SMALL};
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;

  & tr:not(:last-child) > th,
  & tr:not(:last-child) > td {
    border-bottom: ${Size.Border.Small} solid ${colors.basic[300]};
  }

  & tr > th:not(:last-child),
  & tr > td:not(:last-child) {
    border-right: ${Size.Border.Small} solid ${colors.basic[300]};
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
