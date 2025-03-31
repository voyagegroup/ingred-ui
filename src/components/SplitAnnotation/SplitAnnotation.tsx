import * as React from "react";
import Spacer from "../Spacer";
import Divider from "../Divider";
import Flex from "../Flex";
import * as Styled from "./styled";
import { DivElementProps } from "../../utils/reactElementTypes";

export type Props = DivElementProps;

const SplitAnnotation = React.forwardRef<HTMLDivElement, Props>(
  function SplitAnnotation({ children, ...rest }, ref) {
    return (
      <Flex
        ref={ref}
        display="flex"
        {...rest}
      >
        <Spacer pr={1} />
        <Divider orientation="vertical" />
        <Spacer pr={1} />
        <Styled.Container>{children}</Styled.Container>
      </Flex>
    );
  },
);

export default SplitAnnotation;
