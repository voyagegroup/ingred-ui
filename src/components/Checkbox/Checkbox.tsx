import * as React from "react";
import * as Styled from "./styled";

export type CheckBoxProps = React.ComponentPropsWithRef<"input"> & {
  indeterminate?: boolean;
  error?: boolean;
};

const Checkbox: React.FunctionComponent<CheckBoxProps> = ({
  children,
  indeterminate = false,
  checked = false,
  error = false,
  ...rest
}) => {
  return (
    <Styled.Container>
      <Styled.Checkbox
        error={error}
        readOnly={true}
        type="checkbox"
        checked={checked}
        indeterminate={indeterminate}
        {...rest}
      />
      <Styled.Span
        error={error}
        indeterminate={indeterminate}
        hasChild={!!children}
      >
        {children}
      </Styled.Span>
    </Styled.Container>
  );
};

export default Checkbox;
