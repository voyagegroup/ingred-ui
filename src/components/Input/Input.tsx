import * as React from "react";
import * as Styled from "./styled";

export type Props = (
  | React.ComponentPropsWithoutRef<"input">
  | React.ComponentPropsWithoutRef<"textarea">
) & {
  error?: boolean;
  multiline?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical" | "inherit";
};

const Input = React.forwardRef<HTMLTextAreaElement | HTMLInputElement, Props>(
  ({ error = false, multiline = false, resize = "both", ...rest }, ref) => (
    <Styled.Input
      {...rest}
      ref={ref as any}
      as={multiline ? "textarea" : "input"}
      isError={error}
      resize={resize}
    />
  ),
);

export default Input;
