import * as React from "react";
import styled from "styled-components";
import LoadingBar from ".";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export default {
  title: "LoadingBar",
  parameters: {
    component: LoadingBar,
  },
};

export const Overview = () => (
  <Container>
    <LoadingBar />
  </Container>
);
