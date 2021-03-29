import * as React from "react";
import Typography from "../../../Typography";
import { CloseButton } from "../CloseButton";
import * as Styled from "./styled";

export type Props = {
  filterOption: any;
};

export const Label: React.FunctionComponent<Props> = ({ filterOption }) => {
  return (
    <Styled.Container>
      <Styled.LeftContainer>
        <Typography size="sm" component="span">
          説明
        </Typography>
      </Styled.LeftContainer>
      <Styled.RightContainer>
        <CloseButton />
      </Styled.RightContainer>
    </Styled.Container>
  );
};
