import * as React from "react";
import { useTheme } from "../../../../themes";
import Icon from "../../../Icon";
import Typography from "../../../Typography";
import { ReferedFilterType } from "../../types";
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
  const theme = useTheme();
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
        <Styled.IconContainer onClick={handleClick}>
          <Icon name="close_circle" color={theme.palette.black} />
        </Styled.IconContainer>
      </Styled.RightContainer>
    </Styled.Container>
  );
};
