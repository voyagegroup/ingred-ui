import * as React from "react";
import Icon from "../../../Icon";
import * as Styled from "./styled";

export type Props = {};

export const CloseButton: React.FunctionComponent<Props> = () => {
  return (
    <Styled.IconContainer>
      <Icon name="close" color="white" size="xs" />
    </Styled.IconContainer>
  );
};
