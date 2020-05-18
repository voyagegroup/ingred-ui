import * as React from "react";

import * as Styled from "./styled";
import Typography from "../../../Typography";

type Props = {
  index: number;
  isActiveIndex: boolean;
  onClick: () => void;
};

export const NumberButton: React.FunctionComponent<Props> = ({
  index,
  isActiveIndex,
  onClick,
}) => (
  <Styled.NumberButton
    disabled={isActiveIndex}
    active={isActiveIndex}
    type="button"
    onClick={onClick}
  >
    <Typography
      component="span"
      weight="bold"
      size="xs"
      color={isActiveIndex ? "white" : "primary"}
    >
      {index}
    </Typography>
  </Styled.NumberButton>
);
