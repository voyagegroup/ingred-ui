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
const shadowColor = colors.basic[900];

const getColorFromOpacityAndBaseColor = (opacity = 0, color = shadowColor) => {
  if (opacity === 0) {
    return "none";
  }
  return hexToRgba(color, opacity * opacityBase);
};

export const Shadows: ShadowsType = [
  "none",
  `0px -3px ${getColorFromOpacityAndBaseColor(
    2,
  )} inset, 0px 2px ${getColorFromOpacityAndBaseColor(1)}`, // button
  `0px 3px ${getColorFromOpacityAndBaseColor(
    2,
  )} inset, 0px 2px ${getColorFromOpacityAndBaseColor(1)}`, // button active
  `0px -2px ${getColorFromOpacityAndBaseColor(
    2,
  )} inset, 0px 1px ${getColorFromOpacityAndBaseColor(1)}`, // radio and checkbox
  `0px 1px ${getColorFromOpacityAndBaseColor(2)} inset`, // toggle
  `0px 0px 16px ${getColorFromOpacityAndBaseColor(5)}`, // tooltip, snackbar and dialog
  // MEMO: Since "success" and "danger" are different colors here, you need to take an argument or create two different definitions.
  "", // toast
];

// box-shadow の色が固定ではない時に使う関数
// 要リファクタリング
export const getShadowWithColor = (tokenNumber: number, color?: string) => {
  if (color === undefined) return Shadows[tokenNumber];

  switch (tokenNumber) {
    case 1:
    case 2:
    case 3:
      return Shadows[tokenNumber]
        .replace(
          getColorFromOpacityAndBaseColor(2),
          getColorFromOpacityAndBaseColor(2, color),
        )
        .replace(
          getColorFromOpacityAndBaseColor(1),
          getColorFromOpacityAndBaseColor(1, color),
        );
    case 4:
      return Shadows[4].replace(
        getColorFromOpacityAndBaseColor(2),
        getColorFromOpacityAndBaseColor(2, color),
      );
    case 5:
      return Shadows[5].replace(
        getColorFromOpacityAndBaseColor(5),
        getColorFromOpacityAndBaseColor(5, color),
      );
    default:
      return "none";
  }
};
