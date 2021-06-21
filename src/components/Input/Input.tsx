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
>(({ error = false, multiline = false, resize = "both", ...rest }, ref) => (
  <Styled.Input
    {...rest}
    ref={ref as any}
    as={(multiline ? "textarea" : "input") as any}
    isError={error}
    resize={resize}
  />
));

export default Input;
