import * as React from "react";
import * as Styled from "./styled";
import Button from "../Button";

type Props = { contentPosition?: "up" | "down" }

const DropdownButton : React.FC<Props> = ({ contentPosition = "down" }) => {
  const [focusButton, setFocusButton] = React.useState<boolean>(false);
  const [activeContent, setActiveContent] = React.useState<boolean>(false);

  const handleBlur = () => {
    setFocusButton(false);
  };
  const handleClickButton = () => {
    setFocusButton(!focusButton);
  };
  const handleMouseDown = () => {
    setActiveContent(true);
  };
  const handleClickContent = () => {
    setActiveContent(false);
  };

  return (
    <Styled.Container>
      <Button onClick={handleClickButton} onBlur={handleBlur}>
        hoge
      </Button>
      {(focusButton || activeContent) && (
        <Styled.ContentsWrapper contentPosition={contentPosition}>
          <Styled.UL>
            <Styled.LI
              onMouseDown={handleMouseDown}
              onClick={handleClickContent}
            >
              保存する
            </Styled.LI>
            <Styled.LI
              onMouseDown={handleMouseDown}
              onClick={handleClickContent}
            >
              保存して実行する
            </Styled.LI>
            <Styled.LI
              onMouseDown={handleMouseDown}
              onClick={handleClickContent}
            >
              下書きとして保存する
            </Styled.LI>
          </Styled.UL>
        </Styled.ContentsWrapper>
      )}
    </Styled.Container>
  );
}

export { DropdownButton };