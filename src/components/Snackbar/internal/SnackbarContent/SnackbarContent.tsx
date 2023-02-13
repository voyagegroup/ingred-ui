import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../../Icon";
import { SnackbarColor } from "../../Snackbar";
import { Theme } from "../../../../themes";
import { useTheme } from "../../../../themes/useTheme";
import { getShadow } from "../../../../utils/getShadow";

type Props = {
  color: SnackbarColor;
  onClose?: () => void;
  children: React.ReactNode;
};

const getSnackbarStyle = (
  theme: Theme,
): {
  [key in SnackbarColor]: {
    iconColor: string;
    boxShadow: string;
    background: string;
    textColor?: string;
  };
} => {
  return {
    default: {
      iconColor: theme.palette.black,
      boxShadow: getShadow(
        5,
        theme.palette.action.shadowOpacity,
        theme.palette.action.shadowBase,
      ),
      background: theme.palette.background.default,
    },
    dark: {
      iconColor: theme.palette.white,
      boxShadow: getShadow(
        5,
        theme.palette.action.shadowOpacity,
        theme.palette.action.shadowBase,
      ),
      // theme.palette.black だと palette 経由での dark の変更が難しい
      // 現状の palette だとこの部分の自由度が足りず表現できないので一旦 theme.palette.black で固定
      background: theme.palette.black,
      textColor: theme.palette.text.white,
    },
    warning: {
      iconColor: theme.palette.warning.deepDark,
      boxShadow: getShadow(
        5,
        theme.palette.action.shadowOpacity,
        theme.palette.warning.highlight,
      ),
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
