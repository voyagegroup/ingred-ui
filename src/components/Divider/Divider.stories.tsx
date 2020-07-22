import * as React from "react";
import styled from "styled-components";
import Divider from ".";
import Typography from "../Typography";
import Spacer from "../Spacer";

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
      Normal
    </Typography>
    <RowContainer>
      <Divider />
    </RowContainer>
    <Typography weight="bold" size="xxl">
      With Space
    </Typography>
    <RowContainer>
      <Divider m={3} />
      <Spacer pt={2} pl={2}>
        <Typography size="md" weight="bold">
          ＊It can define margin and padding like &quot;Spacer&quot; component.
        </Typography>
      </Spacer>
    </RowContainer>
    <Typography weight="bold" size="xxl">
      Override Color
    </Typography>
    <RowContainer>
      <Divider color="red" m={3} />
    </RowContainer>
  </Container>
);
