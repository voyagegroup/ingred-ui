import { hexToRgba } from "../utils/hexToRgba";
import { colors } from "./color";

export type ShadowsType = [
  "none",
  string,
  string,
  string,
  string,
  string,
  string,
];

const OPACITY_BASE = 8;
const opacityBase = OPACITY_BASE / 100;

export const Shadows: ShadowsType = [
  "none",
  `0px -3px ${hexToRgba(
    colors.basic[900],
    opacityBase * 2,
  )} inset, 0px 2px ${hexToRgba(colors.basic[900], opacityBase)}`, // button
  `0px 3px ${hexToRgba(
    colors.basic[900],
    opacityBase * 2,
  )} inset, 0px 2px ${hexToRgba(colors.basic[900], opacityBase)}`, // button active
  `0px -2px ${hexToRgba(
    colors.basic[900],
    opacityBase * 2,
  )} inset, 0px 1px ${hexToRgba(colors.basic[900], opacityBase)}`, // radio and checkbox
  `0px 1px ${hexToRgba(colors.basic[900], opacityBase * 2)} inset`, // toggle
  `0px 0px 16px ${hexToRgba(colors.basic[900], opacityBase * 5)}`, // tooltip, snackbar and dialog
  // MEMO: Since "success" and "danger" are different colors here, you need to take an argument or create two different definitions.
  "", // toast
];
