import { Theme } from "../../themes";
import { ButtonColor, ButtonColorStyle } from "./Button";

export const getContainerColorStyles = (
  theme: Theme,
): { [P in ButtonColor]: ButtonColorStyle } => ({
  primary: {
    normal: {
      background: theme.palette.primary.main,
      color: theme.palette.text.white,
      boxShadow: theme.shadow["3dShadowPrimary"],
      border: `1px solid ${theme.palette.primary.dark}`,
    },
    hover: {
      background: theme.palette.primary.dark,
      border: "none",
    },
    active: {
      background: theme.palette.primary.dark,
      boxShadow: theme.shadow["3dShadowActive"],
      border: "none",
    },
  },
  basicLight: {
    normal: {
      background: theme.palette.background.default,
      color: theme.palette.black,
      boxShadow: theme.shadow["3dShadowBasic"],
      border: `1px solid ${theme.palette.divider}`,
    },
    hover: {
      background: theme.palette.gray.highlight,
      border: `1px solid ${theme.palette.divider}`,
    },
    active: {
      background: theme.palette.gray.highlight,
      boxShadow: theme.shadow["3dShadowActive"],
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  basicDark: {
    normal: {
      background: theme.palette.basicDark.main,
      color: theme.palette.black,
      boxShadow: theme.shadow["3dShadowBasic"],
      border: `1px solid ${theme.palette.basicDark.deepDark}`,
    },
    hover: {
      background: theme.palette.basicDark.dark,
      border: "none",
    },
    active: {
      background: theme.palette.basicDark.dark,
      boxShadow: theme.shadow["3dShadowBasicActive"],
      border: "none",
    },
  },
  danger: {
    normal: {
      background: theme.palette.danger.main,
      color: theme.palette.text.white,
      boxShadow: theme.shadow["3dShadowDanger"],
      border: `1px solid ${theme.palette.danger.dark}`,
    },
    hover: {
      background: theme.palette.danger.dark,
      border: "none",
    },
    active: {
      background: theme.palette.danger.dark,
      boxShadow: theme.shadow["3dShadowActive"],
      border: "none",
    },
  },
  clear: {
    normal: {
      background: "none",
      color: theme.palette.black,
      boxShadow: "none",
      border: "none",
    },
    hover: {
      background: theme.palette.gray.light,
      border: "none",
    },
    active: {
      background: theme.palette.gray.main,
      boxShadow: "none",
      border: "none",
    },
  },
  primaryPale: {
    normal: {
      background: theme.palette.primaryPale.main,
      color: theme.palette.primaryPale.dark,
      boxShadow: theme.shadow["3dShadowPrimaryPale"],
      border: `1px solid ${theme.palette.primaryPale.light}`,
    },
    hover: {
      background: theme.palette.primaryPale.highlight,
      border: "none",
    },
    active: {
      background: theme.palette.primaryPale.highlight,
      boxShadow: theme.shadow["3dShadowPrimaryPaleActive"],
      border: "none",
    },
  },
});
