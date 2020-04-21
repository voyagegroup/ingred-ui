import * as React from "react";
import styled from "styled-components";
import Spacer from "./Spacer";
import Button from "../Button";
import Typography from "../Typography";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const SpacerContainer = styled.div`
  display: inline-flex;
  background-color: black;
`;

export default {
  title: "Spacer",
  parameters: {
    component: Spacer
  }
};

const marginProps = [
  "m: margin",
  "mt: margin-top",
  "mr: margin-right",
  "mb: margin-bottom",
  "ml: margin-left",
  "mx: margin-left and margin-right",
  "my: margin-top and margin-bottom"
];

const paddingProps = [
  "p: padding",
  "pt: padding-top",
  "pr: padding-right",
  "pb: padding-bottom",
  "pl: padding-left",
  "px: padding-left and padding-right",
  "py: padding-top and padding-bottom"
];

export const Overview = () => (
  <Container>
    <Typography size="xxxxl" weight="bold">
      Margin &amp; Padding
    </Typography>
    <Typography size="xxxl" weight="bold">
      Margin Props
    </Typography>
    <ul>
      {marginProps.map(l => (
        <li>{l}</li>
      ))}
    </ul>

    <Typography size="xxxl" weight="bold">
      Padding Props
    </Typography>
    <ul>
      {paddingProps.map(l => (
        <li>{l}</li>
      ))}
    </ul>

    <Typography size="xxxl" weight="bold">
      {"<Spacer p={1}>"}
    </Typography>
    <SpacerContainer>
      <Spacer p={1}>
        <Button inline>ボタン</Button>
      </Spacer>
    </SpacerContainer>
  </Container>
);
