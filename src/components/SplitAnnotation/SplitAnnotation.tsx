import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";

export type Props = {};

const SplitAnnotation: React.FunctionComponent<Props> = ({ children }) => (
  <Spacer pl={1}>
    <Styled.Container>{children}</Styled.Container>
  </Spacer>
);

export default SplitAnnotation;
