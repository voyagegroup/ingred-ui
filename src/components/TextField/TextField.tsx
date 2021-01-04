import * as React from "react";
import * as Styled from "./styled";
import Input from "../Input";
import { InputProps } from "../Input/Input";
import ErrorText from "../ErrorText";
import Spacer from "../Spacer";
import Typography from "../Typography";
import Icon from "../Icon";
import Flex from "../Flex";
import { useTheme } from "../../themes";
import { IconName } from "../Icon/Icon";

export type TextFieldProps = InputProps & {
  errorText?: string;
  icon?: IconName;
  type?: string;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
};

const TextField: React.FunctionComponent<TextFieldProps> = ({
  errorText,
  icon,
  type,
  inputRef,
  ...rest
}) => {
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const handleToggleShowPassword = () => {
    setShow(!show);
  };

  return (
    <Styled.Container>
      <Styled.InputContainer
        hasLeftIcon={icon != null}
        hasRightIcon={type === "password"}
      >
        {icon != null && (
          <Styled.LeftIconContainer onClick={handleToggleShowPassword}>
            <Icon name={icon} size="md" color={theme.palette.gray.dark} />
          </Styled.LeftIconContainer>
        )}
        <Input
          ref={inputRef}
          {...rest}
          error={!!errorText}
          type={show ? "text" : type}
        />
        {type === "password" && (
          <Styled.RightIconContainer onClick={handleToggleShowPassword}>
            <Icon
              name={show ? "eye" : "eye_off"}
              size="md"
              color={theme.palette.black}
            />
          </Styled.RightIconContainer>
        )}
      </Styled.InputContainer>
      {errorText && (
        <Spacer pt={1}>
          <ErrorText>{errorText}</ErrorText>
        </Spacer>
      )}
      {type === "password" && (
        <Spacer pt={1}>
          <Flex display="flex" alignItems="center">
            <Spacer mr={0.25}>
              <Icon name="eye_off" />
            </Spacer>
            <Typography color="secondary" size="sm">
              をクリックするとパスワード表示できます
            </Typography>
          </Flex>
        </Spacer>
      )}
    </Styled.Container>
  );
};

export default TextField;
