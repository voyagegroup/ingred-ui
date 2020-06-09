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
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  button + button {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

const Column = styled.div`
  width: 120px;
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
    console.log("hoge");
    setOpen(isOpen);
  };
  return (
    <Container>
      <RowContainer>
        <Column>
          <div ref={setIconWrapperElement} onClick={onHandleIsOpen(!open)}>
            <Icon name="question" type="fill" />
          </div>
          <SpeechBubble
            baseElement={iconWrapperElement}
            open={open}
            onClose={onHandleIsOpen(false)}
          >
            <Typography size="sm" lineHeight="1.7">
              指定したグループと紐付いているクリエイティブのみがグループとして選択できます。
              グループとの紐付けは「設定＞デマンド広告クリエイティブ管理（リンク）」から行えます
            </Typography>
          </SpeechBubble>
        </Column>
      </RowContainer>
    </Container>
  );
};
