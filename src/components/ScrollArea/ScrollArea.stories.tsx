import * as React from "react";
import styled from "styled-components";
import ScrollArea from "./index";
import { text } from "@storybook/addon-knobs";
import Flex from "../Flex";
import Spacer from "../Spacer";
import Typography from "../Typography";

const Container = styled.div`
  width: 300px;
  border: solid 1px ${({ theme }) => theme.palette.divider};
`;

const Content = styled.div`
  height: 1000px;
`;

export default {
  title: "ScrollArea",
  component: ScrollArea,
};

export const Overview = () => {
  const height = text("Height", "300px");
  const maxHeight = text("MaxHeight", "none");
  const minHeight = text("MinHeight", "none");
  return (
    <Flex display="flex" flexDirection="column" alignItems="center">
      <Container>
        <ScrollArea height={height} maxHeight={maxHeight} minHeight={minHeight}>
          <Content />
        </ScrollArea>
      </Container>
      <Spacer pt={5} />
      <Typography>※Only for Mac x Chromium</Typography>
    </Flex>
  );
};
