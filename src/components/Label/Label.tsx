import * as React from "react";
import Typography from "../Typography";
import { FontSize } from "../Typography/Typography";
import { CloseButton } from "./internal/CloseButton";
import * as Styled from "./styled";

export type LabelProps = {
  labelTitle?: string;
  labelElement?: any;
  onRemove?: (labelElement: any) => void;
  size?: FontSize;
};

const Label: React.FunctionComponent<LabelProps> = ({
  labelTitle,
  labelElement,
  onRemove,
  size = "sm",
}) => {
  const handleClick = () => {
    if (onRemove) {
      onRemove(labelElement);
    }
  };
  return (
    <Styled.Container>
      <Styled.LeftContainer>
        <Typography size={size} component="span">
          {labelTitle}
        </Typography>
      </Styled.LeftContainer>
      {onRemove ? (
        <Styled.RightContainer>
          <CloseButton onClick={handleClick} />
        </Styled.RightContainer>
      ) : (
        <div />
      )}
    </Styled.Container>
  );
};

export default Label;
