import * as React from "react";
import Typography from "../Typography";
import { FontSize } from "../Typography/Typography";
import { CloseButton } from "./internal/CloseButton";
import * as Styled from "./styled";

export type LabelProps = {
  title?: string;
  element?: any;
  onRemove?: (element: any) => void;
  size?: FontSize;
};

const Label: React.FunctionComponent<LabelProps> = ({
  title,
  element,
  onRemove,
  size = "sm",
}) => {
  const handleClick = () => {
    if (onRemove) {
      onRemove(element);
    }
  };
  return (
    <Styled.Container>
      <Styled.LeftContainer>
        <Typography size={size} component="span">
          {title}
        </Typography>
      </Styled.LeftContainer>
      {onRemove && (
        <Styled.RightContainer>
          <CloseButton onClick={handleClick} />
        </Styled.RightContainer>
      )}
    </Styled.Container>
  );
};

export default Label;
