import * as React from "react";
import Icon from "../../Icon";
import * as Styled from "./styled";

export const Empty = () => {
  return (
    <Styled.Container>
      <Styled.EmptyMessageContainer>
        <Icon name="search" />
        <Styled.TextContainer>
          検索ワードを入力してください
        </Styled.TextContainer>
      </Styled.EmptyMessageContainer>
    </Styled.Container>
  );
};
