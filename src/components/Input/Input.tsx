import { Property } from "csstype";
import * as React from "react";
import { createChainedFunction } from "../../utils/createChainedFunction";
import * as Styled from "./styled";

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
  const handleWheel = (
    event: React.WheelEvent<HTMLInputElement> &
      React.WheelEvent<HTMLTextAreaElement>,
  ) => {
    event.currentTarget.blur();
  };

  return (
    <Styled.Input
      {...rest}
      ref={ref as any}
      as={(multiline ? "textarea" : "input") as any}
      isError={error}
      resize={resize}
      onWheel={createChainedFunction(
        rest.type === "number" ? handleWheel : null,
        rest.onWheel,
      )}
    />
  );
});

export default Input;
