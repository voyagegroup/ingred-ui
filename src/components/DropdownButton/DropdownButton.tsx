import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { useTheme } from "../../themes";
import Icon from "../Icon";
import { ButtonSize } from "../Button/Button";
import { ContentProp } from "../MenuList/MenuList";
import Menu from "../Menu";

type Props = {
  size?: ButtonSize;
  onClick?: () => void;
  split?: boolean;
  contents: ContentProp[];
  disabled?: boolean;
  positionPriority?: PopperJS.Placement[];
};

const DropdownButton: React.FC<Props> = ({
  size = "medium",
  onClick,
  split = false,
  contents,
  disabled = false,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
  children,
}) => {
  const theme = useTheme();
  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const [activeContent, setActiveContent] = React.useState<boolean>(false);

  const onHandleToggleContent = (showContent: boolean) => () => {
    if (showContent && !split && onClick) {
      onClick();
    }
    setShowContent(showContent);
  };
  const onHandleContentActive = (isActive: boolean) => () => {
    setActiveContent(isActive);
  };

  return (
    <>
      <Styled.ButtonContainer ref={setButtonElement} role="button">
        {split ? (
          <>
            <Styled.MainButton
              size={size}
              inline={true}
              disabled={disabled}
              onClick={onClick}
            >
              {children}
            </Styled.MainButton>
            <Styled.SplitToggle
              size={size}
              inline={true}
              disabled={disabled}
              onClick={onHandleToggleContent(!showContent)}
              onBlur={onHandleToggleContent(false)}
            >
              <Icon
                name={"arrow_bottom"}
                size="lg"
                color={
                  disabled ? theme.palette.text.disabled : theme.palette.white
                }
              />
            </Styled.SplitToggle>
          </>
        ) : (
          <Styled.SingleButton
            size={size}
            disabled={disabled}
            onClick={onHandleToggleContent(!showContent)}
            onBlur={onHandleToggleContent(false)}
          >
            {children}
            <Icon
              name={"arrow_bottom"}
              size="lg"
              color={
                disabled ? theme.palette.text.disabled : theme.palette.white
              }
            />
          </Styled.SingleButton>
        )}
      </Styled.ButtonContainer>
      {(showContent || activeContent) && (
        <Menu
          baseElement={buttonElement}
          contents={contents}
          positionPriority={positionPriority}
          onMouseDown={onHandleContentActive(true)}
          onTouchStart={onHandleContentActive(true)}
          onClick={onHandleContentActive(false)}
        />
      )}
    </>
  );
};

export default DropdownButton;
