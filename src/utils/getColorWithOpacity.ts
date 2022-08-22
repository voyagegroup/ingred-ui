import { colors } from "../styles";
import { hexToRgba } from "./hexToRgba";

export const OPACITY_BASE = 8;
export const opacityBase = OPACITY_BASE / 100;

// opacity と 色から rgba を作る
export const getColorWithOpacity = (
  opacity = 0,
  color = colors ? colors.basic[900] : "#041C33",
) => {
  if (opacity === 0) {
    return "transparent";
  }
  return hexToRgba(color, opacity * opacityBase);
};
