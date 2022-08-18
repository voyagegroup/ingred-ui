import { hexToRgba } from "../utils/hexToRgba";
import { colors } from "./color";

export type ShadowsType = {
  none: string;
  button: string;
  buttonActive: string;
  radio: string;
  checkbox: string;
};

const OPACITY_BASE = 8;
const opacityBase = OPACITY_BASE / 100;

export const Shadows: ShadowsType = {
  none: "none",
  button: `0px -3px ${hexToRgba(
    colors.basic[900],
    opacityBase * 2,
  )} inset, 0px 2px ${hexToRgba(colors.basic[900], opacityBase)}`,
  buttonActive: `0px 3px ${hexToRgba(
    colors.basic[900],
    opacityBase * 2,
  )} inset, 0px 2px ${hexToRgba(colors.basic[900], opacityBase)}`,
  radio: `0px -2px ${hexToRgba(
    colors.basic[900],
    opacityBase * 2,
  )} inset, 0px 1px ${hexToRgba(colors.basic[900], opacityBase)}`,
  checkbox: `0px -2px ${hexToRgba(
    colors.basic[900],
    opacityBase * 2,
  )} inset, 0px 1px ${hexToRgba(colors.basic[900], opacityBase)}`,
};
