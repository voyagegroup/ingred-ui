import * as React from "react";
import * as Styled from "./styled";
import Button from "../Button";

type Props = { contentPosition?: "up" | "down" }

const DropdownButton : React.FC<Props> = ({ contentPosition = "down" }) => {
  const contentsElement = React.useRef<HTMLDivElement>(
    document.createElement("div"),
  );
  const [show, setShow] = React.useState<boolean>(false);

  const handleMouseDown = () => {
    setShow(!show);
  };
  const handleBlur = () => {
    setShow(false);
  };
  const handleClick = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    if (show) {
      contentsElement.current.focus();
    }
  }, [show]);

  return (
    <Styled.Container>
      <Button onMouseDown={handleMouseDown}>hoge</Button>
      {show && (
        <Styled.ContentsWrapper
          ref={contentsElement}
          tabIndex={-1}
          contentPosition={contentPosition}
          onBlur={handleBlur}
        >
          <Styled.UL>
            <Styled.LI onClick={handleClick}>保存する</Styled.LI>
            <Styled.LI onClick={handleClick}>保存して実行する</Styled.LI>
            <Styled.LI onClick={handleClick}>下書きとして保存する</Styled.LI>
          </Styled.UL>
        </Styled.ContentsWrapper>
      )}
    </Styled.Container>
  );
}

export { DropdownButton };