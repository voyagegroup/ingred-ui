import * as React from "react";
import * as Styled from "./styled";
import Button from "../Button";
import { usePopper } from "react-popper";
import Icon from "../Icon";
import { colors } from "../../styles/color";

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
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const [activeContent, setActiveContent] = React.useState<boolean>(false);

  const { styles, attributes } = usePopper(buttonElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "flip",
        options: {
          padding: { bottom: 24, right: 24 },
          fallbackPlacements: ["bottom-end", "top-start", "top-end"],
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
      {(showContent || activeContent) && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          onMouseDown={handleContentActive(true)}
          onTouchStart={handleContentActive(true)}
          onClick={handleContentActive(false)}
        >
          {children}
        </div>
      )}
    </>
  );
}

export { DropdownButton };
