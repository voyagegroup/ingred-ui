import * as React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";
import { useMergeRefs } from "../../hooks/useMergeRefs";

export type InputProps = (
  | React.ComponentPropsWithoutRef<"input">
  | React.ComponentPropsWithoutRef<"textarea">
) & {
  type?: string;
  error?: boolean;
  multiline?: boolean;
  resize?: Property.Resize;
};

const NumberInput = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  InputProps
>(({ error = false, multiline = false, resize = "both", ...rest }, ref) => {
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const mergeedRef = useMergeRefs(ref, inputRef);

  const onChange = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement> &
        React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const value = event.target.value;
      if (isNaN(Number(value)) || value === " ") {
        if (inputRef.current) {
          inputRef.current.value = value.substring(0, value.length - 1);
        }
        return;
      }
      if (rest.onChange) rest.onChange(event);
    },
    [rest],
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === " ") {
        event.preventDefault();
      }
    },
    [],
  );

  return (
    <Styled.Input
      {...rest}
      ref={mergeedRef}
      type="text"
      as={(multiline ? "textarea" : "input") as any}
      isError={error}
      resize={resize}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
});

const Input = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  InputProps
>(({ error = false, multiline = false, resize = "both", ...rest }, ref) =>
  rest.type === "number" ? (
    <NumberInput {...rest} ref={ref} />
  ) : (
    <Styled.Input
      {...rest}
      ref={ref as any}
      as={(multiline ? "textarea" : "input") as any}
      isError={error}
      resize={resize}
    />
  ),
);

export default Input;
