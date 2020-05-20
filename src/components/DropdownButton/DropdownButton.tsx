import * as React from "react";
import * as PopperJS from '@popperjs/core';
import * as Styled from "./styled";
import Icon from "../Icon";
import { ButtonSize } from "../Button/Button";
import { useTheme } from "../../themes";
import { MenuList } from "./internal/MenuList";

type MenuContent = {
  text: string;
  onClick: () => void;
  divideTop?: boolean;
};

type Props = {
  size?: ButtonSize;
  onClick?: () => void;
  split?: boolean;
  contents: MenuContent[];
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
            <Styled.MainButton
              size={size}
              inline={true}
              onClick={onClick}
            >
              {children}
            </Styled.MainButton>
            <Styled.SplitToggle
              size={size}
              inline={true}
              onClick={handleToggleContent(!showContent)}
              onBlur={handleToggleContent(false)}
            >
              <Icon name={"arrow_bottom"} size="lg" color={theme.palette.white} />
            </Styled.SplitToggle>
          </>
        ) : (
          <Styled.SingleButton
            onClick={handleToggleContent(!showContent)}
            onBlur={handleToggleContent(false)}
            size={size}
          >
            {children}
            <Icon name={"arrow_bottom"} size="lg" color={theme.palette.white} />
          </Styled.SingleButton>
        )}
      </Styled.ButtonContainer>
      {(showContent || activeContent) && (
        <Styled.MenuPopper
          baseElement={buttonElement}
          popperOptions={{
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
          }}
          onMouseDown={handleContentActive(true)}
          onTouchStart={handleContentActive(true)}
          onClick={handleContentActive(false)}
        >
          <MenuList contents={contents} />
        </Styled.MenuPopper>
      )}
    </>
  );
}

export default DropdownButton;
