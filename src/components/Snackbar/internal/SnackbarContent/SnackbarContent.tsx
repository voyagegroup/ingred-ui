import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../../Icon";
import { SnackbarColor } from "../../Snackbar";
import { Theme } from "../../../../themes";
import { useTheme } from "../../../../themes/useTheme";
import { hexToRgba } from "../../../../utils/hexToRgba";

type Props = {
  color: SnackbarColor;
  onClose?: () => void;
};

const getSnackbarStyle = (
  theme: Theme,
): {
  [key in SnackbarColor]: {
    iconColor: string;
    boxShadow: string;
    background: string;
  };
} => {
  return {
    default: {
      iconColor: theme.palette.black,
      boxShadow: `0px 0px ${theme.spacing * 2}px ${hexToRgba(
        theme.palette.gray.main,
        0.4,
      )}`,
      background: theme.palette.background.default,
    },
    dark: {
      iconColor: theme.palette.white,
      boxShadow: `0px 0px ${theme.spacing * 2}px ${hexToRgba(
        theme.palette.gray.deepDark,
        0.4,
      )}`,
      background: theme.palette.gray.deepDark,
    },
    warning: {
      iconColor: theme.palette.warning.deepDark,
      boxShadow: `0px 0px ${theme.spacing * 2}px ${hexToRgba(
        theme.palette.warning.highlight,
        0.4,
      )}`,
      background: theme.palette.warning.highlight,
    },
  };
};

const SnackbarContent: React.FunctionComponent<Props> = ({
  color,
  onClose,
  children,
}) => {
  const theme = useTheme();
  const style = getSnackbarStyle(theme)[color];
  return (
    <Styled.Container {...style}>
      {children}
      <Styled.IconContainer onClick={onClose}>
        <Icon name="close" color={style.iconColor} />
      </Styled.IconContainer>
    </Styled.Container>
  );
};

export { SnackbarContent };
