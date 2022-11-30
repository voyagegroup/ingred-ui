import * as React from "react";
import * as Styled from "./styled";

const CalenderInput: React.FC = () => {
  return (
    <Styled.Container>
      <Styled.Input letterCount={4} type={"text"} aria-label="Year" />
      /
      <Styled.Input letterCount={2} type={"text"} aria-label="Month" />
      /
      <Styled.Input letterCount={2} type={"text"} aria-label="Day" />
    </Styled.Container>
  );
};

export default CalenderInput;
