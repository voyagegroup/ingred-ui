import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { useTheme } from "../../themes";
import Icon from "../Icon";
import Menu from "../Menu";
import { ButtonSize, ButtonColor } from "../Button/Button";
import { ContentProp } from "../MenuList/MenuList";

type DropdownButtonColor = Exclude<ButtonColor, "danger">;

export type DropdownButtonProps = {
  size?: ButtonSize;
  color?: DropdownButtonColor;
  onClick?: () => void;
  split?: boolean;
  contents: ContentProp[];
  disabled?: boolean;
  positionPriority?: PopperJS.Placement[];
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  size = "medium",
  color = "primary",
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

  const setIconColor = (disabled: boolean, color: DropdownButtonColor) => {
    if (disabled) {
      return theme.palette.text.disabled;
    } else if (color === "primary") {
      return theme.palette.white;
    } else {
      return "fill";
    }
  };

  return (
    <>
      <Styled.ButtonContainer ref={setButtonElement} role="button">
        {split ? (
          <>
            <Styled.MainButton
              size={size}
              color={color}
              inline={true}
              disabled={disabled}
              onClick={onClick}
            >
              {children}
            </Styled.MainButton>
            <Styled.SplitToggle
              size={size}
              color={color}
              inline={true}
              disabled={disabled}
              data-testid="menu-toggle"
              onClick={onHandleToggleContent(!showContent)}
            >
              <Icon
                name={"arrow_bottom"}
                size="lg"
                color={setIconColor(disabled, color)}
              />
            </Styled.SplitToggle>
          </>
        ) : (
          <Styled.SingleButton
            size={size}
            color={color}
            disabled={disabled}
            data-testid="menu-toggle"
            onClick={onHandleToggleContent(!showContent)}
          >
            {children}
            <Icon
              name={"arrow_bottom"}
              size="lg"
              color={setIconColor(disabled, color)}
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
