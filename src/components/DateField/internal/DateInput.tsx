import React from "react";
import { Input } from "./styled";

export type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  error?: boolean;
};

export const DateInput = React.forwardRef<HTMLInputElement, InputProps>(
  function InputComponent({ error = false, ...rest }, ref) {
    return <Input {...rest} ref={ref} isError={error} />;
  },
);
