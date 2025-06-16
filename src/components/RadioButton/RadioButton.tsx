import * as React from "react";
import * as Styled from "./styled";

export enum RadioButtonSize {
  SMALL = "16px",
  MEDIUM = "18px",
}
export const indicatorSizes = {
  [RadioButtonSize.SMALL]: {
    inside: "6px",
    border: "1px",
  },
  [RadioButtonSize.MEDIUM]: {
    inside: "8px",
    border: "1px",
  },
};

export type RadioButtonChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  checked: boolean,
) => void;

export type RadioButtonProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> & {
  size?: RadioButtonSize;
  children?: React.ReactNode;
  onChange?: RadioButtonChangeHandler;
  inputRef?: React.Ref<HTMLInputElement>;
};

const RadioButton = React.forwardRef<
  HTMLLabelElement | HTMLSpanElement,
  RadioButtonProps
>(function RadioButton(
  {
    size = RadioButtonSize.MEDIUM,
    onChange,
    inputRef,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e, e.target.checked);
    }
  };
  return (
    <Styled.Wrapper
      ref={ref}
      as={children == null ? "span" : "label"}
      disabled={disabled}
      size={size}
    >
      <input
        {...rest}
        ref={inputRef}
        disabled={disabled}
        type="radio"
        onChange={handleChange}
      />
      <Styled.Indicator size={size} {...indicatorSizes[size]} />
      {children != null ? (
        <Styled.Label checked={rest.checked} disabled={disabled}>
          {children}
        </Styled.Label>
      ) : null}
    </Styled.Wrapper>
  );
});

export default RadioButton;
