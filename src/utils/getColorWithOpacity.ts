import { hexToRgba } from "./hexToRgba";

export const OPACITY_BASE = 8;
export const opacityBase = OPACITY_BASE / 100;
export const defaultShadowColor = "#041C33"; // colors.basic[900];

export const getColorWithOpacity = (
  opacity = 0,
  color = defaultShadowColor,
) => {
  if (opacity === 0) {
    return "transparent";
  }
  return hexToRgba(color, opacity * opacityBase);
};
