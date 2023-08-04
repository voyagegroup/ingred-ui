import * as React from "react";
import { useTheme } from "../../themes/useTheme";
import Flex from "../Flex";
import Icon from "../Icon";
import Spacer from "../Spacer";
import Typography from "../Typography";

export type ErrorTextProps = {
  children: string;
};

const ErrorText = React.forwardRef<HTMLDivElement, ErrorTextProps>(
  ({ children }, ref) => {
    const theme = useTheme();
    return (
      <Flex ref={ref} display="flex" alignItems="center">
        <Spacer pr={0.5}>
          <Icon
            name="exclamation"
            color={theme.palette.danger.main}
            size="md"
          />
        </Spacer>
        <Typography color={theme.palette.danger.main}>{children}</Typography>
      </Flex>
    );
  },
);

export default ErrorText;
