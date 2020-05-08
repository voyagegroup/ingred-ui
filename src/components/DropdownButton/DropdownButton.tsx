import * as React from "react";
import * as Styled from "./styled";
import Button from "../Button";

type Props = { contentPosition?: "up" | "down" }

const DropdownButton : React.FC<Props> = ({ contentPosition = "down" }) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const contentsElement = React.useRef<HTMLDivElement>(
    document.createElement("div"),
  );

  const handleClick = () => {
    setFocus(!focus)
  }
  const handleBlur = () => {
    setFocus(false);
  }

  React.useEffect(() => {
    if (focus) {
      contentsElement.current.focus();
    }
  }, [focus]);

  return (
    <>
      <Styled.ButtonWrapper>
        <Button onClick={handleClick} >hoge</Button>
        {focus && (
          <Styled.ContentsWrapper
            tabIndex={0}
            ref={contentsElement}
            onBlur={handleBlur}
            contentPosition={contentPosition}
          >
            <Styled.UL>
              <Styled.LI onClick={handleClick}>保存する</Styled.LI>
              <Styled.LI onClick={handleClick}>保存して実行する</Styled.LI>
              <Styled.LI onClick={handleClick}>下書きとして保存する</Styled.LI>
            </Styled.UL>
          </Styled.ContentsWrapper>
        )}
      </Styled.ButtonWrapper>
    </>
  )
}

export { DropdownButton };