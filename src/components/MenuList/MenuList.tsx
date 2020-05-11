import React from "react";
import * as Styled from "./styled";
import { Divider } from "./internal/Divider";

type Props = {
  inline?: boolean;
  contents: {
    text: string;
    onClick: () => void;
  }[];
  divideIndex?: number[];
};

const MenuList: React.FC<Props> = ({
  inline = false,
  contents,
  divideIndex = []
}) => (
  <Styled.Container inline={inline}>
    {contents.map((content, index) => (
      <React.Fragment key={content.text}>
        {/* TODO: Listの中身は<MenuItem />のようなコンポーネントとして定義する */}
        <Styled.Div onClick={content.onClick}>
          {content.text}
        </Styled.Div>
        { divideIndex.includes(index) && <Divider /> }
      </React.Fragment>
    ))}
  </Styled.Container>
);

export { MenuList };
