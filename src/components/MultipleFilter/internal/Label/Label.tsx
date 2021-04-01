import * as React from "react";
import Typography from "../../../Typography";
import { ReferedFilterType } from "../../types";
import { CloseButton } from "../CloseButton";
import * as Styled from "./styled";

export type Props = {
  filter: ReferedFilterType;
  onRemove: (removedFilter: ReferedFilterType) => void;
};

const boolToString = (condition: any) => {
  if (typeof condition === "boolean") {
    return condition ? "Yes" : "No";
  } else {
    return condition;
  }
};

export const Label: React.FunctionComponent<Props> = ({ filter, onRemove }) => {
  const handleClick = () => {
    onRemove(filter);
  };
  return (
    <Styled.Container>
      <Styled.LeftContainer>
        <Typography size="sm" component="span">
          {filter.filterName}
          &nbsp;
          {boolToString(filter.filterCondtion)}
        </Typography>
      </Styled.LeftContainer>
      <Styled.RightContainer>
        <CloseButton onClick={handleClick} />
      </Styled.RightContainer>
    </Styled.Container>
  );
};
