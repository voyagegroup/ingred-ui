import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { ContentProp } from "../MenuList/MenuList";
import ActionButton from "../ActionButton";
import Menu from "../Menu";

type Props = {
  contents: ContentProp[];
  positionPriority?: PopperJS.Placement[];
};

const ContextMenu: React.FunctionComponent<Props> = ({
  contents,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
}) => {
  const [
    iconWrapperElement,
    setIconWrapperElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const [activeContent, setActiveContent] = React.useState<boolean>(false);

  const onHandleToggleContent = (showContent: boolean) => () => {
    setShowContent(showContent);
  };
  const onHandleContentActive = (isActive: boolean) => () => {
    setActiveContent(isActive);
  };

  return (
    <>
      {/* MEMO: ingred-uiに実装する際はActionButtonにforward refを用いる */}
      <Styled.IconWrapper ref={setIconWrapperElement}>
        <ActionButton
          data-testid="icon-wrapper"
          icon="more_vert"
          onClick={onHandleToggleContent(!showContent)}
          onBlur={onHandleToggleContent(false)}
        />
      </Styled.IconWrapper>
      {(showContent || activeContent) && (
        <Menu
          baseElement={iconWrapperElement}
          contents={contents}
          positionPriority={positionPriority}
          onMouseDown={onHandleContentActive(true)}
          onTouchStart={onHandleContentActive(true)}
          onClick={onHandleContentActive(false)}
        />
      )}
    </>
  );
};

export default ContextMenu;
