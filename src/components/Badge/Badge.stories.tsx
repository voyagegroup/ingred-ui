import * as React from "react";
import styled from "styled-components";
import Badge from ".";
import Spacer from "../Spacer";
import Typography from "../Typography";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export default {
  title: "Badge",
  parameters: {
    component: Badge
  }
};

export const Overview = () => {
  return (
    <Container>
      <Typography size="xxxl">
        Example text{" "}
        <Badge type="primary">hoge</Badge>
      </Typography>
      <Spacer py={1} />
      <Typography size="xxl">
        Example text{" "}
        <Badge type="secondary">hoge</Badge>
      </Typography>
      <Spacer py={1} />
      <Typography size="xl">
        Example text{" "}
        <Badge type="warning">hoge</Badge>
      </Typography>
      <Spacer py={1} />
      <Typography size="lg">
        Example text{" "}
        <Badge type="danger">hoge</Badge>
      </Typography>
      <Spacer py={1} />
      <Typography size="md">
        Example text{" "}
        <Badge type="success">hoge</Badge>
      </Typography>
    </Container>
  );
};
