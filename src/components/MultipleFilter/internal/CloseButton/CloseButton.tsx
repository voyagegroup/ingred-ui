import * as React from "react";
import Icon from "../../../Icon";
import * as Styled from "./styled";

export type Props = {
  onClick: () => void;
};

export const CloseButton: React.FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Styled.IconContainer onClick={onClick}>
      <Icon name="close" color="white" size="xs" />
    </Styled.IconContainer>
  );
};
