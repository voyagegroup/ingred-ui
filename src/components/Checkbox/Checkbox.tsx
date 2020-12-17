import * as React from "react";
import * as Styled from "./styled";

export type CheckBoxProps = React.ComponentPropsWithRef<"input"> & {
  indeterminate?: boolean;
  error?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};

const Checkbox: React.FunctionComponent<CheckBoxProps> = ({
  children,
  indeterminate = false,
  error = false,
  inputRef,
  ...rest
}) => {
  return (
    <Styled.Container>
      <Styled.Checkbox
        ref={inputRef}
        error={error}
        readOnly={true}
        type="checkbox"
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
