import { colors } from "../styles/color";
import { DeepPartial } from "../types";
import { deepmerge } from "../utils/deepmerge";

export type PaletteColor = {
  deepDark: string;
  dark: string;
  main: string;
  light: string;
  highlight: string;
};

export type PaletteText = {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  white: string;
};

export type PaletteBackground = {
  default: string;
  dark: string;
  active: string;
  hint: string;
  disabled: string;
};

export type PaletteIcon = {
  active: string;
  fill: string;
  line: string;
};

export type PaletteAction = {
  active: string;
  hover: string;
  selected: string;
  selectedOpacity: number;
  focus: string;
  focusOpacity: number;
  activeBackground: string;
  hoverBackground: string;
};

export type Palette = {
  white: string;
  black: string;
  primary: PaletteColor;
  secondary: PaletteColor;
  success: PaletteColor;
  warning: PaletteColor;
  danger: PaletteColor;
  gray: PaletteColor;
  text: PaletteText;
  background: PaletteBackground;
  divider: string;
  icon: PaletteIcon;

  // =========================
  action: PaletteAction;
  border: PaletteColor;
};

export const palette: Palette = {
  white: colors.basic[50] as string, // TODO
  black: colors.basic[900],
  primary: {
    deepDark: colors.blue[700],
    dark: colors.blue[600],
    main: colors.blue[500],
    light: colors.blue[200],
    highlight: colors.blue[100],
  },
  secondary: {
    deepDark: colors.basic[600],
    dark: colors.basic[500],
    main: colors.basic[300],
    light: colors.basic[200],
    highlight: colors.basic[100],
  },
  success: {
    deepDark: colors.green[700],
    dark: colors.green[600],
    main: colors.green[500],
    light: colors.green[300],
    highlight: colors.green[100],
  },
  warning: {
    deepDark: colors.yellow[900],
    dark: colors.yellow[600],
    main: colors.yellow[500],
    light: colors.yellow[400],
    highlight: colors.yellow[100],
  },
  danger: {
    deepDark: colors.red[700],
    dark: colors.red[600],
    main: colors.red[500],
    light: colors.red[300],
    highlight: colors.red[100],
  },
  gray: {
    deepDark: colors.basic[600],
    dark: colors.basic[500],
    main: colors.basic[300],
    light: colors.basic[200],
    highlight: colors.basic[100],
  },
  text: {
    primary: colors.blue[500],
    secondary: colors.basic[700],
    disabled: colors.basic[400],
    hint: colors.basic[400],
    white: "#FFFFFF",
  },
  background: {
    default: "#FFFFFF",
    dark: colors.blue[40] as string, // TODO
    active: colors.blue[100],
    hint: colors.blue[50] as string, // TODO
    disabled: colors.basic[200],
  },
  // divider は固定値でいい
  divider: colors.basic[400],
  icon: {
    active: colors.blue[500],
    fill: colors.basic[700],
    line: colors.basic[600],
  },

  // opacity は全部 0.08 にする、
  // ======= proposal =======
  // TODO: shadow
  // WIP: 適当な候補だけ書いた
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "#F5F7F8", // basic[100]
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.08,
    activeBackground: colors.basic[300],
    hoverBackground: colors.basic[200],
  },
  border: {
    deepDark: colors.basic[600],
    dark: colors.basic[500],
    main: colors.basic[300],
    light: colors.basic[200],
    highlight: colors.basic[100],
  },
};

export function createPalette(paletteInput: DeepPartial<Palette>): Palette {
  return deepmerge(palette, paletteInput);
}
