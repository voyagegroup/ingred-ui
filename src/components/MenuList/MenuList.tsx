import React from "react";
import * as Styled from "./styled";

type Props = {
  inline?: boolean;
  contents: {
    text: string;
    onClick: () => void;
  }[];
};

const MenuList: React.FC<Props> = ({ inline = false, contents }) => (
  <Styled.Container inline={inline}>
    <Styled.UL>
      {contents.map((content) => (
        <Styled.LI key={content.text} onClick={content.onClick}>
          {content.text}
        </Styled.LI>
      ))}
    </Styled.UL>
  </Styled.Container>
);

export { MenuList };
