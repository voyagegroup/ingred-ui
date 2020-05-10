import * as React from "react";
import * as Styled from "./styled";
import Button from "../Button";
import { usePopper } from "react-popper";

type Props = {
  title: string;
  contents: {
    text: string;
    onClick: () => void;
  }[];
};

const DropdownButton : React.FC<Props> = ({ title, contents }) => {
  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [focusButton, setFocusButton] = React.useState<boolean>(false);
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

  const handleBlur = () => {
    setFocusButton(false);
  };
  const handleClickButton = () => {
    setFocusButton(!focusButton);
  };
  const handleActiveContent = () => {
    setActiveContent(true);
  };
  const handleClickContent = (onClick: () => void) => () => {
    setActiveContent(false);
    onClick();
  };

  return (
    <Styled.Container>
      <Button
        ref={setButtonElement}
        onClick={handleClickButton}
        onBlur={handleBlur}
      >
        {title}
      </Button>
      {(focusButton || activeContent) && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          onMouseDown={handleActiveContent}
          onTouchStart={handleActiveContent}
        >
          <Styled.ContentsWrapper>
            <Styled.UL>
              {contents.map((content) => (
                <Styled.LI
                  key={content.text}
                  onClick={handleClickContent(content.onClick)}
                >
                  {content.text}
                </Styled.LI>
              ))}
            </Styled.UL>
          </Styled.ContentsWrapper>
        </div>
      )}
    </Styled.Container>
  );
}

export { DropdownButton };