import * as React from "react";
import * as Styled from "./styled";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import { useTheme } from "../../themes";

export type Props = React.ComponentPropsWithoutRef<"input"> & {
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  icon?: IconName;
};
const Input: React.FunctionComponent<Props> = ({
  inputRef,
  error,
  type,
  disabled,
  icon,
  ...rest
}) => {
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const onHandleToggleShowPassword = () => {
    setShow(!show);
  };
  return (
    <Styled.Container
      className={[error ? "is-error" : "", disabled ? "is-disabled" : ""].join(
        " ",
      )}
    >
      {icon != null && (
        <Styled.LeftIconContainer onClick={onHandleToggleShowPassword}>
          <Icon name={icon} size="md" color={theme.palette.gray.main} />
        </Styled.LeftIconContainer>
      )}
      <Styled.Input
        {...rest}
        ref={inputRef}
        disabled={disabled}
        type={type === "password" && !show ? "password" : "text"}
        className={[
          error ? "is-error" : "",
          disabled ? "is-disabled" : "",
        ].join(" ")}
        hasLeftIcon={icon != null}
        hasRightIcon={type === "password"}
      />
      {type === "password" && (
        <Styled.RightIconContainer onClick={onHandleToggleShowPassword}>
          <Icon
            name={show ? "eye" : "eye_off"}
            size="md"
            color={theme.palette.black}
          />
        </Styled.RightIconContainer>
      )}
    </Styled.Container>
  );
};

export default Input;
