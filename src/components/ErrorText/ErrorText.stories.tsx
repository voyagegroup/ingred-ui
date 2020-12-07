import * as React from "react";
import styled from "styled-components";
import ErrorText from ".";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export default {
  title: "ErrorText",
  component: ErrorText,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => (
  <Container>
    <ErrorText>エラーです</ErrorText>
  </Container>
);
