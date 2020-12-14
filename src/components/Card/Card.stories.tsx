import * as React from "react";
import styled from "styled-components";
import Card from "./";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export default {
  title: "Components/Layout/Card",
  component: Card,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => (
  <Container>
    <Card p={3}>コンテンツ</Card>
  </Container>
);
