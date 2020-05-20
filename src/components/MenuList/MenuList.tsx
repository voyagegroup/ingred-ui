import React from "react";
import * as Styled from "./styled";
import { Divider } from "./internal/Divider";

export type ContentProp = {
  text: string;
  onClick: () => void;
  divideTop?: boolean;
};

type Props = {
  inline?: boolean;
  contents: ContentProp[];
};

const MenuList: React.FC<Props> = ({
  inline = false,
  contents,
}) => (
  <Styled.Container inline={inline}>
    {contents.map((content) => (
      <React.Fragment key={content.text}>
        { content.divideTop && <Divider /> }
        <Styled.TextContainer onClick={content.onClick}>
          {content.text}
        </Styled.TextContainer>
      </React.Fragment>
    ))}
  </Styled.Container>
);

export default MenuList;
