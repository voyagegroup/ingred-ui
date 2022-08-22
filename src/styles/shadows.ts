import {
  getColorWithOpacity,
  opacityBase as _opacityBase,
} from "../utils/getColorWithOpacity";

export type ShadowsType = ["none", string, string, string, string, string];

export const opacityBase = _opacityBase; // 0.08

export const Shadows: ShadowsType = [
  // Pattern 00
  "none",
  // Pattern 01
  `0px -3px ${getColorWithOpacity(2)} inset, 0px 2px ${getColorWithOpacity(1)}`,
  // Pattern 02
  `0px 3px ${getColorWithOpacity(2)} inset, 0px 2px ${getColorWithOpacity(1)}`,
  // Pattern 03
  `0px -2px ${getColorWithOpacity(2)} inset, 0px 1px ${getColorWithOpacity(1)}`,
  // Pattern 04
  `0px 1px ${getColorWithOpacity(2)} inset`,
  // Pattern 05
  `0px 0px 16px ${getColorWithOpacity(5)}`,
];
