import * as React from "react";
import * as Styled from "./styled";
import Input from "../Input";
import { Props as InputProps } from "../Input/Input";
import ErrorText from "../ErrorText";
import Spacer from "../Spacer";
import Typography from "../Typography";
import Icon from "../Icon";
import Flex from "../Flex";
import { useTheme } from "../../themes";
import { IconName } from "../Icon/Icon";

type Props = InputProps & {
  errorText?: string;
  icon?: IconName;
};

const TextField: React.FunctionComponent<Props> = ({
  errorText,
  type,
  icon,
  ...rest
}) => {
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const onHandleToggleShowPassword = () => {
    setShow(!show);
  };

  return (
    <Styled.Container>
      <Styled.InputContainer>
        {icon != null && (
          <Styled.LeftIconContainer onClick={onHandleToggleShowPassword}>
            <Icon name={icon} size="md" color={theme.palette.gray.main} />
          </Styled.LeftIconContainer>
        )}
        <Input {...rest} error={!!errorText} type={type} />
        {type === "password" && (
          <Styled.RightIconContainer onClick={onHandleToggleShowPassword}>
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
