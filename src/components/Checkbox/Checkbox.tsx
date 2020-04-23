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
        readOnly={true}
        type="checkbox"
        checked={checked}
        indeterminate={indeterminate}
        {...rest}
      />
      <Styled.Span indeterminate={indeterminate} hasChild={!!children}>
        {children}
      </Styled.Span>
    </Styled.Container>
  );
};

export default Checkbox;
