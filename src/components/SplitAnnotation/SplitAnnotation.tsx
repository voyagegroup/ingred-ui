import * as React from "react";
import Spacer from "../Spacer";
import Divider from "../Divider";
import Flex from "../Flex";
import * as Styled from "./styled";

export type Props = {};

const SplitAnnotation = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => (
    <Flex ref={ref} display="flex">
      <Spacer pr={1} />
      <Divider orientation="vertical" />
      <Spacer pr={1} />
      <Styled.Container>{children}</Styled.Container>
    </Flex>
  ),
);

export default SplitAnnotation;
