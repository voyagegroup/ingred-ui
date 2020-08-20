import React from "react";
import styled from "styled-components";

import Table from "./";
import Flex from "../Flex";
import Typography from "../Typography";
import Badge from "../Badge";

export default {
  title: "Table",
  parameters: {
    component: Table,
  },
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const Overview = () => (
  <Container>
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell width="177px">
            <Flex
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="div" weight="bold" size="md">
                タイトル
              </Typography>
              <Badge color="danger" fontWeight="bold">
                必須
              </Badge>
            </Flex>
          </Table.HeaderCell>
          <Table.Cell colSpan={2}>コンテンツ</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell width="177px">タイトル</Table.HeaderCell>
          <Table.Cell colSpan={2}>コンテンツ</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell rowSpan={2} width="177px">
            タイトル
          </Table.HeaderCell>
          <Table.HeaderCell width="177px">タイトル</Table.HeaderCell>
          <Table.Cell>コンテンツ</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell width="177px">タイトル</Table.HeaderCell>
          <Table.Cell>コンテンツ</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
);
