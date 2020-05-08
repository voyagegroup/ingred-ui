import * as React from "react";
import styled from "styled-components";
import { DropdownButton } from "./";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
  width: 400px;
`;

export default {
  title: "DropdownButton",
  parameters: {
    component: DropdownButton
  }
};

export const Overview = () => (
  <>
    <Container>
      <DropdownButton />
    </Container>
    <Container>
      <DropdownButton contentPosition="up" />
    </Container>
  </>
);
