import { ShadowsType } from "../styles/shadows";
import { Palette } from "../themes";
import { hexToRgba } from "./hexToRgba";

/**
 * shadow の色を shadows で定義した色から変更したいときに使う関数
 */
export const getShadowWithColor = (
  shadows: ShadowsType,
  palette: Palette,
  tokenNumber: number,
  color?: string,
) => {
  if (color === undefined) return shadows[tokenNumber];

  switch (tokenNumber) {
    case 1:
    case 2:
    case 3:
      return shadows[tokenNumber]
        .replace(
          hexToRgba(
            palette.action.shadowBase,
            palette.action.shadowOpacity * 2,
          ),
          hexToRgba(color, palette.action.shadowOpacity * 2),
        )
        .replace(
          hexToRgba(palette.action.shadowBase, palette.action.shadowOpacity),
          hexToRgba(color, palette.action.shadowOpacity),
        );
    case 4:
    case 5:
      return shadows[tokenNumber].replace(
        hexToRgba(palette.action.shadowBase, palette.action.shadowOpacity * 2),
        hexToRgba(color, palette.action.shadowOpacity * 2),
      );
    default:
      return "none";
  }
};
