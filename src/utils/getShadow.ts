import { hexToRgba } from "./hexToRgba";

export type TokenType = 1 | 2 | 3 | 4 | 5;

/**
 * shadow token から box-shadow を取得する関数。
 * opacity と color 引数で box-shadow の濃さと色を調整できるようにしている。
 */
export const getShadow = (
  token: TokenType,
  opacityBase: number,
  color: string,
) => {
  switch (token) {
    case 1:
      return `0px -3px ${hexToRgba(
        color,
        opacityBase * 2,
      )} inset, 0px 2px ${hexToRgba(color, opacityBase)}`;
    case 2:
      return `0px 3px ${hexToRgba(
        color,
        opacityBase * 2,
      )} inset, 0px 2px ${hexToRgba(color, opacityBase)}`;
    case 3:
      return `0px -2px ${hexToRgba(
        color,
        opacityBase * 2,
      )} inset, 0px 1px ${hexToRgba(color, opacityBase)}`;
    case 4:
      return `0px 1px ${hexToRgba(color, opacityBase * 2)} inset`;
    case 5:
      return `0px 0px 16px ${hexToRgba(color, opacityBase * 2)}`;
  }
};
