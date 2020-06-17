import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { useTheme } from "../../themes";
import Icon from "../Icon";
import Menu from "../Menu";
import { ButtonSize } from "../Button/Button";
import { ContentProp } from "../MenuList/MenuList";

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

  const onHandleToggleContent = (showContent: boolean) => () => {
    if (showContent && !split && onClick) {
      onClick();
    }
    setShowContent(showContent);
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
              data-testid="menu-toggle"
              onClick={onHandleToggleContent(!showContent)}
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
            data-testid="menu-toggle"
            onClick={onHandleToggleContent(!showContent)}
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
      {showContent && (
        <Menu
          baseElement={buttonElement}
          contents={contents}
          positionPriority={positionPriority}
          onClick={onHandleToggleContent(false)}
          onClickAway={onHandleToggleContent(false)}
        />
      )}
    </>
  );
};

export default DropdownButton;
