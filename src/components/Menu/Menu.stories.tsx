import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { select, text } from "@storybook/addon-knobs";
import Menu from ".";

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
  title: "Menu",
  component: Menu,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
  const contents = [
    {
      text: "保存する",
      onClick: action("clicked '保存する'"),
    },
    {
      text: "保存して実行する",
      onClick: action("clicked '保存して実行する'"),
      divideTop: true,
    },
    {
      text: "下書きとして保存する",
      onClick: action("clicked '下書きとして保存する'"),
    },
  ];

  const position = select(
    "Position",
    {
      top: "top",
      top_start: "top-start",
      top_end: "top-end",
      bottom: "bottom",
      bottom_start: "bottom-start",
      bottom_end: "bottom-end",
      left: "left",
      left_start: "left-start",
      left_end: "left-end",
      right: "right",
      right_start: "right-start",
      right_end: "right-end",
    },
    "top",
  );
  const maxHeight = text("MaxHeight", "none");

  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  const handleToggleMenu = (showMenu: boolean) => () => {
    setShowMenu(showMenu);
  };

  return (
    <Container>
      <RowContainer>
        <button ref={setButtonElement} onClick={handleToggleMenu(!showMenu)}>
          Click me!!
        </button>
        {showMenu && (
          <Menu
            baseElement={buttonElement}
            contents={contents}
            positionPriority={[position]}
            maxHeight={maxHeight}
            onClose={handleToggleMenu(false)}
          />
        )}
      </RowContainer>
    </Container>
  );
};
