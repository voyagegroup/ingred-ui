import * as React from "react";
import * as Styled from "./styled";

type Props = React.ComponentPropsWithRef<"input"> & {
  indeterminate?: boolean;
};

const Checkbox: React.FunctionComponent<Props> = ({
  children,
  indeterminate = false,
  checked = false,
  ...rest
}) => {
  return (
    <Styled.Container>
      <Styled.Checkbox
        type="checkbox"
        checked={checked}
        indeterminate={indeterminate}
        {...rest}
        onChange={() => {}}
      />
      <Styled.Span hasChild={!!children}>{children}</Styled.Span>
    </Styled.Container>
  );
};

export default Checkbox;
