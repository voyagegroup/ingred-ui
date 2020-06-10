import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import ClickAwayListener from ".";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div<{ minHeight?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: ${({ minHeight }) => minHeight || "0"};
`;

export default {
  title: "ClickAwayListener",
  parameters: {
    components: ClickAwayListener,
  },
};

export const Overview = () => (
  <Container>
    <RowContainer>
      <ClickAwayListener onClickAway={action("clicked outer")}>
        <button onClick={action("clicked inner")}>Click outer me!!</button>
      </ClickAwayListener>
    </RowContainer>
  </Container>
);
