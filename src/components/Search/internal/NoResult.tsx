import * as React from "react";
import * as Styled from "./styled";

export const NotResult = () => {
  return (
    <Styled.Container>
      <Styled.NoResultMessageContainer>
        <Styled.BoldTextContainer>
          一致する情報がありませんでした。
        </Styled.BoldTextContainer>
        <Styled.TextContainer>
          検索ワードを変更して再検索してください。
        </Styled.TextContainer>
      </Styled.NoResultMessageContainer>
    </Styled.Container>
  );
};
