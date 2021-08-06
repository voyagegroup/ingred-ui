import * as React from "react";
import { useTheme } from "../../../../themes";
import Icon from "../../../Icon";
import Typography from "../../../Typography";
import { ReferredFilterType } from "../../types";
import * as Styled from "./styled";

export type Props = {
  filter: ReferredFilterType;
  onRemove: (removedFilter: ReferredFilterType) => void;
  onClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    willEditFilter: ReferredFilterType,
  ) => void;
};

const boolToString = (condition: any) => {
  if (typeof condition === "boolean") {
    return condition ? "Yes" : "No";
  } else {
    return condition;
  }
};

export const Label: React.FunctionComponent<Props> = ({
  filter,
  onRemove,
  onClick,
}) => {
  const theme = useTheme();
  const handleRemoveClick = () => {
    onRemove(filter);
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(event, filter);
  };
  return (
    <Styled.Container>
      <Styled.LeftContainer onClick={handleClick}>
        <Typography size="sm" component="span">
          {filter.filterName}
          &nbsp;
          {boolToString(filter.filterCondition)}
        </Typography>
      </Styled.LeftContainer>
      <Styled.RightContainer>
        <Styled.IconContainer onClick={handleRemoveClick}>
          <Icon name="close_circle" color={theme.palette.black} />
        </Styled.IconContainer>
      </Styled.RightContainer>
    </Styled.Container>
  );
};
