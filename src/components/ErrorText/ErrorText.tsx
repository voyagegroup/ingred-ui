import * as React from "react";
import Icon from "../Icon";
import Spacer from "../Spacer";
import Typography from "../Typography";
import Flex from "../Flex";
import { useTheme } from "../../themes/useTheme";

interface Props {
  children: string;
}

const ErrorText: React.FunctionComponent<Props> = ({ children }) => {
  const theme = useTheme();
  return (
    <Flex display="flex" alignItems="center">
      <Spacer pr={0.5}>
        <Icon name="exclamation" color={theme.palette.danger.main} size="md" />
      </Spacer>
      <Typography color={theme.palette.danger.main}>{children}</Typography>
    </Flex>
  );
};

export default ErrorText;
