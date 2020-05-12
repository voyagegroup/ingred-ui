import * as React from "react";
import * as Styled from "./styled";
import { Theme } from "../../themes";
import { useTheme } from "../../themes/useTheme";

export type BadgeType =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"

const getColor = (key: BadgeType, theme: Theme) => {
  switch (key) {
    case "primary":
      return theme.palette.primary.main;
    case "secondary":
      return theme.palette.gray.dark;
    case "success":
      return theme.palette.success.main;
    case "warning":
      return theme.palette.warning.main;
    case "danger":
      return theme.palette.danger.main;
  }
};

export type Props = React.ComponentPropsWithRef<"a"|"span"> & {
  type: BadgeType;
  component?: "span" | "a";
}

const Badge: React.FunctionComponent<Props> = ({
  type,
  component = "span",
  children,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <Styled.Container
      as={component}
      color={theme.palette.text.white}
      backgroundColor={getColor(type, theme)}
      {...rest}
    >
      {children}
    </Styled.Container>
  )
}

export default Badge;
