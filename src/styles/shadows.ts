import { hexToRgba } from "../utils/hexToRgba";

export type ShadowsType = ["none", string, string, string, string, string];

export const Shadows: ShadowsType = [
  // Pattern 00
  "none",
  // Pattern 01
  `0px -3px ${hexToRgba("#041C33", 0.16)} inset, 0px 2px ${hexToRgba(
    "#041C33",
    0.08,
  )}`,
  // Pattern 02
  `0px 3px ${hexToRgba("#041C33", 0.16)} inset, 0px 2px ${hexToRgba(
    "#041C33",
    0.08,
  )}`,
  // Pattern 03
  `0px -2px ${hexToRgba("#041C33", 0.16)} inset, 0px 1px ${hexToRgba(
    "#041C33",
    0.08,
  )}`,
  // Pattern 04
  `0px 1px ${hexToRgba("#041C33", 0.16)} inset`,
  // Pattern 05
  `0px 0px 16px ${hexToRgba("#041C33", 0.16)}`,
];
