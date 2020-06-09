import * as React from "react";
import styled from "styled-components";
import SpeechBubble from ".";
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

const Content = styled.div`
  width: 300px;
`;

export default {
  title: "SpeechBubble",
  parameters: {
    component: SpeechBubble,
  },
};

export const Overview: React.FunctionComponent = () => {
  const [
    iconWrapperElement,
    setIconWrapperElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const onHandleIsOpen = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };
  return (
    <Container>
      <RowContainer>
        <div ref={setIconWrapperElement} onClick={onHandleIsOpen(!open)}>
          <Icon name="question" type="fill" />
        </div>
        <SpeechBubble
          baseElement={iconWrapperElement}
          open={open}
          onClose={onHandleIsOpen(false)}
        >
          <Content>
            <Typography size="sm" lineHeight="1.7">
              指定したグループと紐付いているクリエイティブの
              みがグループとして選択できます。グループとの紐
              付けは設定メニューから行えます。
            </Typography>
          </Content>
        </SpeechBubble>
      </RowContainer>
    </Container>
  );
};
