import * as React from "react";
import * as Styled from "./styled";

export type CheckBoxProps = React.ComponentPropsWithoutRef<"input"> & {
  indeterminate?: boolean;
  error?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};

const Checkbox = React.forwardRef<HTMLLabelElement, CheckBoxProps>(
  (
    {
      children,
      indeterminate = false,
      error = false,
      disabled = false,
      inputRef,
      ...rest
    },
    ref,
  ) => {
    return (
      <Styled.Container ref={ref} disabled={disabled}>
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
  },
);

export default Checkbox;
