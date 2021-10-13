import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { useTheme } from "../../themes";
import Icon from "../Icon";
import Spacer from "../Spacer";
import Menu, { MenuProps } from "../Menu";
import { ButtonSize, ButtonColor } from "../Button/Button";
import { ContentProp } from "../MenuList/MenuList";
import { createChainedFunction } from "../../utils/createChainedFunction";
import { useMergeRefs } from "../../hooks/useMergeRefs";

type DropdownButtonColor = Exclude<ButtonColor, "danger">;

export type DropdownButtonProps = {
  size?: ButtonSize;
  color?: DropdownButtonColor;
  onClick?: () => void;
  split?: boolean;
  /**
   * props of [MenuList](/?path=/docs/components-navigation-menulist)
   */
  contents: ContentProp[];
  disabled?: boolean;
  /**
   * Define priority of position. Please check [this](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements).
   */
  positionPriority?: PopperJS.Placement[];
  menuMaxHeight?: MenuProps["maxHeight"];
  menuProps?: Partial<MenuProps>;
  children?: React.ReactNode;
};

const DropdownButton = React.forwardRef<HTMLDivElement, DropdownButtonProps>(
  (
    {
      size = "medium",
      color = "primary",
      onClick,
      split = false,
      contents,
      disabled = false,
      positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
      menuMaxHeight = "none",
      menuProps,
      children,
    },
    ref,
  ) => {
    const theme = useTheme();
    const [buttonElement, setButtonElement] =
      React.useState<HTMLDivElement | null>(null);
    const [showContent, setShowContent] = React.useState<boolean>(false);

    const handleToggleContent = (showContent: boolean) => () => {
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
        return theme.palette.black;
      }
    };

    const refs = useMergeRefs<HTMLDivElement>(ref, setButtonElement);

    return (
      <>
        <Styled.ButtonContainer ref={refs} role="button">
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
                onClick={handleToggleContent(!showContent)}
              >
                <Icon
                  name={"arrow_bottom"}
                  size="md"
                  // eslint-disable-next-line react/jsx-handler-names
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
              onClick={handleToggleContent(!showContent)}
            >
              {children}
              <Spacer pr={0.5} />
              <Icon
                name={"arrow_bottom"}
                size="md"
                // eslint-disable-next-line react/jsx-handler-names
                color={setIconColor(disabled, color)}
              />
            </Styled.SingleButton>
          )}
        </Styled.ButtonContainer>
        <Menu
          isOpen={showContent}
          baseElement={buttonElement}
          contents={contents}
          positionPriority={positionPriority}
          maxHeight={menuMaxHeight}
          {...menuProps}
          onClose={createChainedFunction(
            handleToggleContent(false),
            menuProps?.onClose,
          )}
        />
      </>
    );
  },
);

export default DropdownButton;
