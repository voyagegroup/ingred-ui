import * as React from "react";
import * as Styled from "./styled";

export type CheckBoxProps = React.ComponentPropsWithoutRef<"input"> & {
  indeterminate?: boolean;
  error?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};

const Checkbox: React.FunctionComponent<CheckBoxProps> = ({
  children,
  indeterminate = false,
  error = false,
  disabled = false,
  inputRef,
  ...rest
}) => {
  return (
    <Styled.Container disabled={disabled}>
      <Styled.Checkbox
        ref={inputRef}
        error={error}
        readOnly={true}
        type="checkbox"
        indeterminate={indeterminate}
        disabled={disabled}
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
