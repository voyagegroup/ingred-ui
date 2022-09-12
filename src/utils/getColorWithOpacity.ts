import { hexToRgba } from "./hexToRgba";

// opacity と 色から rgba を作る
export const getColorWithOpacity = (opacity = 0, color = "#041C33") => {
  if (opacity === 0) {
    return "transparent";
  }
  return hexToRgba(color, opacity * 0.08);
};
