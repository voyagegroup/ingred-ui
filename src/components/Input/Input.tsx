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

const Input = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  InputProps
>(({ error = false, multiline = false, resize = "both", ...rest }, ref) => {
  if (rest.type === "number") {
    const onWheel = (
      event: React.WheelEvent<HTMLInputElement> &
        React.WheelEvent<HTMLTextAreaElement>,
    ) => {
      event.currentTarget.blur();
      if (rest.onWheel) rest.onWheel(event);
    };
    return (
      <Styled.Input
        {...rest}
        ref={ref as any}
        as={(multiline ? "textarea" : "input") as any}
        isError={error}
        resize={resize}
        onWheel={onWheel}
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
