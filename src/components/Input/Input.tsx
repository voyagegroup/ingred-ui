import * as React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";

export type InputProps = (
  | React.ComponentPropsWithoutRef<"input">
  | React.ComponentPropsWithoutRef<"textarea">
) & {
  type?: string;
  error?: boolean;
  multiline?: boolean;
  resize?: Property.Resize;
};

const isNumber = (n: string) => {
  // empty or white space
  if (n === "" || n === " ") {
    return false;
  }
  return !isNaN(Number(n));
};

const Input = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  InputProps
>(({ error = false, multiline = false, resize = "both", ...rest }, ref) => {
  if (rest.type === "number") {
    const onChange = (
      event: React.ChangeEvent<HTMLInputElement> &
        React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      if (!isNumber(event.target.value)) return;
      if (rest.onChange) rest.onChange(event);
    };

    const onKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement> &
        React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
      if (!isNumber(event.key) && !(event.key === "Backspace")) {
        event.preventDefault();
      }
      if (rest.onKeyDown) rest.onKeyDown(event);
    };

    return (
      <Styled.Input
        {...rest}
        ref={ref as any}
        type="text"
        as={(multiline ? "textarea" : "input") as any}
        isError={error}
        resize={resize}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }

  return (
    <Styled.Input
      {...rest}
      ref={ref as any}
      as={(multiline ? "textarea" : "input") as any}
      isError={error}
      resize={resize}
    />
  );
});

export default Input;
