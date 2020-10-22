import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";

export type Props = {};

const Annotation: React.FunctionComponent<Props> = ({ children }) => (
  <Spacer pl={1}>
    <Styled.Container>{children}</Styled.Container>
  </Spacer>
);

export default Annotation;
