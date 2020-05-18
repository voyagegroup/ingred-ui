import * as React from "react";
import styled from "styled-components";
import Badge from ".";
import Spacer from "../Spacer";
import Typography from "../Typography";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div<{ minHeight?: string }>`
  display: flex;
  align-items: flex-start;
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: ${({ minHeight }) => minHeight || "0"};
`;

const Column = styled.div`
  min-width: 300px;
  & + & {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: "Badge",
  parameters: {
    component: Badge,
  },
};

export const Overview = () => {
  return (
    <Container>
      <RowContainer>
        <Column>
          <Spacer pb={3}>
            <Typography weight="bold" size="xxxxxl">
              normal
            </Typography>
          </Spacer>
          <Typography size="xxxl">
            Example text <Badge color="primary">hoge</Badge>
          </Typography>
          <Spacer py={1} />
          <Typography size="xxl">
            Example text <Badge color="secondary">hoge</Badge>
          </Typography>
          <Spacer py={1} />
          <Typography size="xl">
            Example text <Badge color="warning">hoge</Badge>
          </Typography>
          <Spacer py={1} />
          <Typography size="lg">
            Example text <Badge color="danger">hoge</Badge>
          </Typography>
          <Spacer py={1} />
          <Typography size="md">
            Example text <Badge color="success">hoge</Badge>
          </Typography>
        </Column>
        <Column>
          <Spacer pb={3}>
            <Typography weight="bold" size="xxxxxl">
              pill
            </Typography>
          </Spacer>
          <Typography size="xxxl">
            Example text{" "}
            <Badge color="primary" type="pill">
              hoge
            </Badge>
          </Typography>
          <Spacer py={1} />
          <Typography size="xxl">
            Example text{" "}
            <Badge color="secondary" type="pill">
              hoge
            </Badge>
          </Typography>
          <Spacer py={1} />
          <Typography size="xl">
            Example text{" "}
            <Badge color="warning" type="pill">
              hoge
            </Badge>
          </Typography>
          <Spacer py={1} />
          <Typography size="lg">
            Example text{" "}
            <Badge color="danger" type="pill">
              hoge
            </Badge>
          </Typography>
          <Spacer py={1} />
          <Typography size="md">
            Example text{" "}
            <Badge color="success" type="pill">
              hoge
            </Badge>
          </Typography>
        </Column>
      </RowContainer>
    </Container>
  );
};
