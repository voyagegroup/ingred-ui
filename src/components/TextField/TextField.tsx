import * as React from "react";
import * as Styled from "./styled";
import Input from "../Input";
import { Props as InputProps } from "../Input/Input";
import ErrorText from "../ErrorText";
import Spacer from "../Spacer";
import Typography from "../Typography";
import Icon from "../Icon";
import Flex from "../Flex";

type Props = InputProps & {
  errorText?: string;
};

const TextField: React.FunctionComponent<Props> = ({
  errorText,
  type,
  ...rest
}) => (
  <Styled.Container>
    <Input {...rest} error={!!errorText} type={type} />
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

export default TextField;
