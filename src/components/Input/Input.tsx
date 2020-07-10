import * as React from "react";
import * as Styled from "./styled";

export type Props = React.ComponentPropsWithoutRef<"input"> & {
  inputRef?: React.Ref<HTMLInputElement>;
  error?: boolean;
};

const Input: React.FunctionComponent<Props> = ({
  inputRef,
  error = false,
  type = "text",
  ...rest
}) => <Styled.Input {...rest} ref={inputRef} isError={error} />;

export default Input;
