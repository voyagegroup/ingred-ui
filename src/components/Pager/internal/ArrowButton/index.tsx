import * as React from "react";

import * as Styled from "./styled";
import Icon from "../../../Icon";
import { useTheme } from "../../../../themes";

type Props = {
  isRight: boolean;
  disabled: boolean;
  onClick: () => void;
};

export const ArrowButton: React.FunctionComponent<Props> = ({
  isRight,
  disabled,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <Styled.ArrowButton disabled={disabled} type="button" onClick={onClick}>
      <Icon
        name={isRight ? "arrow_right" : "arrow_left"}
        size="md"
        color={
          disabled ? theme.palette.text.disabled : theme.palette.icon.active
        }
      />
    </Styled.ArrowButton>
  );
};
