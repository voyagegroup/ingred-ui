import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row } from "./Row";
import { Radius } from "../../../../styles";

const Container = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  & > thead > tr:first-of-type > th {
    &:first-of-type {
      border-top-left-radius: ${Radius.SMALL};
    }
    &:last-of-type {
      border-top-right-radius: ${Radius.SMALL};
    }
  }
  & > tbody > tr:last-of-type > td {
    &:first-of-type {
      border-bottom-left-radius: ${Radius.SMALL};
    }
    &:last-of-type {
      border-bottom-right-radius: ${Radius.SMALL};
    }
  }
`;

export type Props = {
  children: React.ReactNode;
};

export const Table = ({ children }: Props) => <Container>{children}</Container>;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
