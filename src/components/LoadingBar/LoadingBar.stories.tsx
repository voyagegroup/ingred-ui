import * as React from "react";
import styled from "styled-components";
import LoadingBar from ".";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export default {
  title: "LoadingBar",
  component: LoadingBar,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => (
  <Container>
    <LoadingBar />
  </Container>
);
