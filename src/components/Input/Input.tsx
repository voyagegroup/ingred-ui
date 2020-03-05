import * as React from "react";
import * as Styled from "./styled";
import Icon from "../Icon";
import { useTheme } from "../../themes/useTheme";

export interface Props {
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: boolean;
  defaultValue?: string;
  disabled?: boolean;
}
const Input: React.FunctionComponent<Props> = ({
  inputRef,
  error,
  type,
  disabled,
  ...rest
}) => {
  const theme = useTheme();
  const [show, setShow] = React.useState(false);
  const onHandleToggleShowPassword = () => {
    setShow(!show);
  };
  return (
    <Styled.Container
      className={[error ? "is-error" : "", disabled ? "is-disabled" : ""].join(
        " ",
      )}
    >
      <Styled.Input
        {...rest}
        disabled={disabled}
        type={type === "password" && !show ? "password" : "text"}
        ref={inputRef}
        className={[
          error ? "is-error" : "",
          disabled ? "is-disabled" : "",
        ].join(" ")}
      />
      {type === "password" && (
        <Styled.IconContainer onClick={onHandleToggleShowPassword}>
          <Icon
            name={show ? "eye" : "eye_off"}
            size="md"
            color={theme.palette.black}
          />
        </Styled.IconContainer>
      )}
    </Styled.Container>
  );
};

export default Input;
