import { hexToRgba } from "../utils/hexToRgba";
import { colors } from "./color";

export type ShadowsType = {
  none: string;
  button: string;
  buttonActive: string;
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
};
