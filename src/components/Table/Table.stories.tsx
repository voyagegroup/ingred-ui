import React from "react";
import Badge from "../Badge";
import Flex from "../Flex";
import Typography from "../Typography";
import Table from "./";

export default {
  title: "Components/Data Display/Table",
  component: Table,
  subcomponents: {
    Header: Table.Header,
    Body: Table.Body,
    Row: Table.Row,
    Cell: Table.Cell,
    HeaderCell: Table.HeaderCell,
  },
};

export const Example = () => (
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell>normal</Table.HeaderCell>
        <Table.HeaderCell>table</Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>row</Table.Cell>
        <Table.Cell>row</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const ChangeVerticalSpacing = () => (
  <Table>
    <Table.Body>
      <Table.Row verticalSpacing="small">
        <Table.HeaderCell>
          <Flex
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="div" weight="bold" size="md">
              Title
            </Typography>
            <Badge color="danger" fontWeight="bold">
              Required
            </Badge>
          </Flex>
        </Table.HeaderCell>
        <Table.Cell>Contents</Table.Cell>
      </Table.Row>
      <Table.Row verticalSpacing="small">
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.Cell>Contents</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const ChangeWidth = () => (
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell width="100px">Title</Table.HeaderCell>
        <Table.Cell>Contents</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell width="100px">Title</Table.HeaderCell>
        <Table.Cell>Contents</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const WithRowSpanAndColSpan = () => (
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.Cell colSpan={2}>Contents</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.Cell colSpan={2}>Contents</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell rowSpan={2}>Title</Table.HeaderCell>
        <Table.HeaderCell>SubTitle</Table.HeaderCell>
        <Table.Cell>Contents</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>SubTitle</Table.HeaderCell>
        <Table.Cell>Contents</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
