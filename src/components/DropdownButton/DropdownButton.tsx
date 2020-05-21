import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { usePopper } from "react-popper";
import Icon from "../Icon";
import { ButtonSize } from "../Button/Button";
import { useTheme } from "../../themes";
import MenuList from "../MenuList";
import { ContentProp } from "../MenuList/MenuList";
import Portal from "../Portal";

type Props = {
  size?: ButtonSize;
  onClick?: () => void;
  split?: boolean;
  contents: ContentProp[];
  positionPriority?: PopperJS.Placement[];
};

const DropdownButton: React.FC<Props> = ({
  size = "medium",
  onClick,
  split = false,
  contents,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
  children,
}) => {
  const theme = useTheme();
  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const [activeContent, setActiveContent] = React.useState<boolean>(false);

  const onHandleToggleContent = (showContent: boolean) => () => {
    if (onClick) onClick();
    setShowContent(showContent);
  };
  const onHandleContentActive = (isActive: boolean) => () => {
    setActiveContent(isActive);
  };

  const { styles, attributes } = usePopper(buttonElement, popperElement, {
    placement: positionPriority[0],
    modifiers: [
      {
        name: "flip",
        options: {
          padding: 24,
          fallbackPlacements: positionPriority,
        },
      },
      {
        name: "preventOverflow",
        options: {
          mainAxis: false,
        },
      },
    ],
  });

  return (
    <>
      <Styled.ButtonContainer ref={setButtonElement} role="button">
        {split ? (
          <>
            <Styled.MainButton size={size} inline={true} onClick={onClick}>
              {children}
            </Styled.MainButton>
            <Styled.SplitToggle
              size={size}
              inline={true}
              onClick={onHandleToggleContent(!showContent)}
              onBlur={onHandleToggleContent(false)}
            >
              <Icon
                name={"arrow_bottom"}
                size="lg"
                color={theme.palette.white}
              />
            </Styled.SplitToggle>
          </>
        ) : (
          <Styled.SingleButton
            size={size}
            onClick={onHandleToggleContent(!showContent)}
            onBlur={onHandleToggleContent(false)}
          >
            {children}
            <Icon name={"arrow_bottom"} size="lg" color={theme.palette.white} />
          </Styled.SingleButton>
        )}
      </Styled.ButtonContainer>
      {(showContent || activeContent) && (
        <Portal>
          <Styled.MenuPopper
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            onMouseDown={onHandleContentActive(true)}
            onTouchStart={onHandleContentActive(true)}
            onClick={onHandleContentActive(false)}
          >
            <MenuList contents={contents} />
          </Styled.MenuPopper>
        </Portal>
      )}
    </>
  );
};

export default DropdownButton;
