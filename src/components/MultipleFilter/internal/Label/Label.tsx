import * as React from "react";
import { CloseButton } from "../CloseButton";
import * as Styled from "./styled";

export type Props = {};

export const Label: React.FunctionComponent<Props> = ({}) => {
  return (
    <Styled.Container>
      aad
      <Styled.RightContainer>
        <CloseButton />
      </Styled.RightContainer>
    </Styled.Container>
  );
};
