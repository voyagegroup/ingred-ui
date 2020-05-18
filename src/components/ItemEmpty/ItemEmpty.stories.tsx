import * as React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import ItemEmpty from "./ItemEmpty";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div<{ minHeight?: string; flex?: boolean }>`
  display: ${({ flex }) => (flex ? "flex" : "block")};
  align-items: ${({ flex }) => (flex ? "flex-start" : "normal")};
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: ${({ minHeight }) => minHeight || "0"};
`;

export default {
  title: "ItemEmpty",
  parameters: {
    component: ItemEmpty,
  },
};

const Example = () => {
  return (
    <ItemEmpty
      title="アイテムが存在しません。"
      subtitle="アイテムを作成してください。"
    />
  );
};

export const Overview = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      Example
    </Typography>
    <RowContainer>
      <Example />
    </RowContainer>
  </Container>
);
