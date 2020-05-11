import * as React from "react";
import * as Styled from "./styled";
import Button from "../Button";
import Icon from "../Icon";
import { colors } from "../../styles/color";
import { Popper } from "../Popper";

type Props = {
  title: string;
  onClick?: () => void;
  split?: boolean;
};

const DropdownButton: React.FC<Props> = ({
  title,
  onClick,
  split = false,
  children,
}) => {
  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const [activeContent, setActiveContent] = React.useState<boolean>(false);

  const handleToggleContent = (showContent: boolean) => () => {
    setShowContent(showContent);
  };
  const handleContentActive = (isActive: boolean) => () => {
    setActiveContent(isActive);
  };

  return (
    <>
      <Styled.ButtonContainer ref={setButtonElement} role="button">
        {split ? (
          <>
            <Styled.MainButton onClick={onClick}>{title}</Styled.MainButton>
            <Styled.SplitToggle
              onClick={handleToggleContent(!showContent)}
              onBlur={handleToggleContent(false)}
            >
              <Icon name={"arrow_bottom"} size="lg" color={colors.basic[50]} />
            </Styled.SplitToggle>
          </>
        ) : (
          <Button
            onClick={handleToggleContent(!showContent)}
            onBlur={handleToggleContent(false)}
          >
            {title}
            <Icon name={"arrow_bottom"} size="lg" color={colors.basic[50]} />
          </Button>
        )}
      </Styled.ButtonContainer>
      <Popper
        show={showContent || activeContent}
        baseElement={buttonElement}
        onMouseDown={handleContentActive(true)}
        onTouchStart={handleContentActive(true)}
        onClick={handleContentActive(false)}
      >
        {children}
      </Popper>
    </>
  );
}

export { DropdownButton };
