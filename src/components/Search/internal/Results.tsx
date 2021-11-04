import * as React from "react";
import * as Styled from "./styled";

type Props<T> = {
  text: string;
  category: T;
}[];

export const Results = <T,>({ filterdData }: { filterdData: Props<T> }) => {
  return (
    <div>
      {filterdData.map(({ text }) => (
        <Styled.AContainer key={text} href="">
          <Styled.ContentTextContainer>{text}</Styled.ContentTextContainer>
          <Styled.UnderLineContainer />
        </Styled.AContainer>
      ))}
    </div>
  );
};
