import * as React from "react";
import styled from "styled-components";
import SplitAnnotation from ".";
import Typography from "../Typography";
import Flex from "../Flex";
import Spacer from "../Spacer";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  button + button {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: " SplitAnnotation",
  component:  SplitAnnotation,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => (
  <Container>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        single-line
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Typography size="md" weight="bold">
          タイトル
        </Typography>
        <SplitAnnotation>
          <Typography size="sm">注釈はこのように表示されます。</Typography>
        </SplitAnnotation>
      </Flex>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        multiple-line
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="flex-start">
        <Typography size="md" weight="bold">
          タイトル
        </Typography>
        <SplitAnnotation>
          <Typography size="sm">注釈はこのように表示されます。</Typography>
          <Typography size="sm">注釈はこのように表示されます。</Typography>
        </SplitAnnotation>
      </Flex>
    </RowContainer>
  </Container>
);
