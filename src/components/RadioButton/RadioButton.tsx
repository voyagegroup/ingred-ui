import * as React from "react";
import styled from "styled-components";
import { hexToRgba } from "../../utils/hexToRgba";

export enum RadioButtonSize {
  // MEDIUM = "24px",
  MEDIUM = "18px",
}

const Wrapper = styled.label<{ size: RadioButtonSize; disabled?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  & > input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    opacity: 0;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

const indicatorSizes = {
  [RadioButtonSize.MEDIUM]: {
    inside: "8px",
    border: "1px",
  },
};

type IndicatorProps = {
  size: RadioButtonSize;
  inside: string;
  border: string;
};
const Indicator = styled.div<IndicatorProps>`
  position: relative;
  display: block;
  flex: 1 0 auto;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  border: ${({ border }) => border} solid
    ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ theme }) =>
    `0px -2px ${hexToRgba(
      theme.palette.black,
      0.16,
    )} inset, 0px 2px ${hexToRgba(theme.palette.black, 0.08)}`};
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.palette.background.default};

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    margin: auto;
    border-radius: 50%;
    content: "";
  }

  &::after {
    width: ${({ inside }) => inside};
    height: ${({ inside }) => inside};
    background: ${({ theme }) => theme.palette.background.default};
    transition-property: background;
  }

  input:checked + & {
    background: ${({ theme }) => theme.palette.primary.main};
    border-color: ${({ theme }) => theme.palette.primary.dark};
  }

  input:disabled + & {
    background: ${({ theme }) => theme.palette.gray.light};
    border-color: ${({ theme }) => theme.palette.text.disabled};
  }
  input:disabled + &:after {
    background: ${({ theme }) => theme.palette.gray.light};
  }
  input:disabled:checked + &:after {
    background: ${({ theme }) => theme.palette.text.disabled};
  }
`;

export const Label = styled.span`
  flex: 0 1 auto;
  margin-left: ${({ theme }) => theme.spacing / 2}px;
  font-size: 14px;

  input:disabled + div + & {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
`;

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
>(
  (
    {
      size = RadioButtonSize.MEDIUM,
      onChange,
      inputRef,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e, e.target.checked);
      }
    };
    return (
      <Wrapper
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
        <Indicator size={size} {...indicatorSizes[size]} />
        {children != null ? <Label>{children}</Label> : null}
      </Wrapper>
    );
  },
);

export default RadioButton;
