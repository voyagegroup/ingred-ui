import * as React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";

export type InputProps = (
  | React.ComponentPropsWithoutRef<"input">
  | React.ComponentPropsWithoutRef<"textarea">
) & {
  error?: boolean;
  multiline?: boolean;
  resize?: Property.Resize;
};

const Input = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  InputProps
>(({ error = false, multiline = false, resize = "both", ...rest }, ref) => {
  if (rest.type === "number") {
    const onChange = (e: any) => {
      const n = Number(e.target.value);
      if (!Number.isFinite(n)) return;
      if (rest.onChange) rest.onChange(e);
    };

    const onKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement> &
        React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
      const n = Number(e.key);

      if (!Number.isFinite(n) && !(e.key === "Backspace")) {
        e.preventDefault();
      }
      if (rest.onKeyDown) rest.onKeyDown(e);
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
