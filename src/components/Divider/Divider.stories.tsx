import * as React from "react";
import styled from "styled-components";
import Divider from ".";
import Typography from "../Typography";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px 0;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export default {
  title: "Divider",
  parameters: {
    component: Divider,
  },
};

export const Overview = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      Full Width
    </Typography>
    <RowContainer>
      <Divider variant="fullWidth" />
    </RowContainer>
    <Typography weight="bold" size="xxl">
      Middle
    </Typography>
    <RowContainer>
      <Divider variant="middle" />
    </RowContainer>
  </Container>
);
