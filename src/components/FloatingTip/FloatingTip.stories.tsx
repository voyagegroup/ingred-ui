import * as React from "react";
import styled from "styled-components";
import { select, boolean, number } from "@storybook/addon-knobs";
import FloatingTip from ".";
import Typography from "../Typography";
import Icon from "../Icon";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const Content = styled.div`
  width: 300px;
`;

export default {
  title: "Components/Data Display/FloatingTip",
  component: FloatingTip,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
  const keepShow = boolean("Keep Show", false);
  const offsetX = number("Offset X", 0);
  const offsetY = number("Offset Y", 10);
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
    "right-start",
  );

  const [
    iconWrapperElement,
    setIconWrapperElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleIsOpen = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };
  return (
    <Container>
      <RowContainer>
        <IconWrapper
          ref={setIconWrapperElement}
          onClick={handleIsOpen(!isOpen)}
        >
          <Icon name="question" type="fill" />
        </IconWrapper>
        <FloatingTip
          baseElement={iconWrapperElement}
          isOpen={isOpen || keepShow}
          offset={[offsetX, offsetY]}
          positionPriority={[position]}
          onClose={handleIsOpen(false)}
        >
          <Content>
            <Typography size="sm" lineHeight="1.7">
              指定したグループと紐付いているクリエイティブの
              みがグループとして選択できます。グループとの紐
              付けは設定メニューから行えます。
            </Typography>
          </Content>
        </FloatingTip>
      </RowContainer>
    </Container>
  );
};
