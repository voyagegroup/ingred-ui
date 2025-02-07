import * as React from "react";
import * as Styled from "./styled";

export enum CheckboxSize {
  SMALL = "small",
  MEDIUM = "medium",
}

// sizeは大きさを示すプロパティとして使いたいため
// size属性を除いたものを定義
type CheckBoxPropsBase = Omit<React.ComponentPropsWithoutRef<"input">, "size">;

export type CheckBoxProps = CheckBoxPropsBase & {
  indeterminate?: boolean;
  error?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  size?: CheckboxSize;
};

const Checkbox = React.forwardRef<HTMLLabelElement, CheckBoxProps>(
  function CheckBox(
    {
      children,
      indeterminate = false,
      error = false,
      disabled = false,
      inputRef,
      size = CheckboxSize.MEDIUM,
      ...rest
    },
    ref,
  ) {
    return (
      <Styled.Container ref={ref} disabled={disabled}>
        <Styled.Checkbox
          ref={inputRef}
          error={error}
          readOnly={true}
          type="checkbox"
          indeterminate={indeterminate}
          disabled={disabled}
          _size={size}
          {...rest}
        />
        <Styled.Span
          size={size}
          error={error}
          indeterminate={indeterminate}
          hasChild={!!children}
          disabled={disabled}
        >
          {children}
        </Styled.Span>
      </Styled.Container>
    );
  },
);

export default Checkbox;
