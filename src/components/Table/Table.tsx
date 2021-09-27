import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row } from "./Row";
import { HeaderCell } from "./HeaderCell";

type ExportedComponentType = {
  (props: React.ComponentPropsWithRef<"table">): JSX.Element;
  Header: typeof Header;
  Body: typeof Body;
  Row: typeof Row;
  Cell: typeof Cell;
  HeaderCell: typeof HeaderCell;
};

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export type TableProps = React.ComponentPropsWithoutRef<"table">;

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, ...rest }, ref) => (
    <Container ref={ref} {...rest}>
      {children}
    </Container>
  ),
);

const ExportedComponent = Table as any;

ExportedComponent.Header = Header;
ExportedComponent.Body = Body;
ExportedComponent.Row = Row;
ExportedComponent.Cell = Cell;
ExportedComponent.HeaderCell = HeaderCell;

export default ExportedComponent as ExportedComponentType;
