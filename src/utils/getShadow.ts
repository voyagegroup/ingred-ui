import { hexToRgba } from "./hexToRgba";

// token types reference: https://github.com/voyagegroup/ingred-ui/pull/940#issuecomment-1221712966
type ButtonToken = 1;
type ButtonActiveToken = 2;
type FormToken = 3;
type ToggleToken = 4;
type TooltipToken = 5;

export type TokenType =
  | ButtonToken
  | ButtonActiveToken
  | FormToken
  | ToggleToken
  | TooltipToken;

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
      return `0px 3px ${hexToRgba(color, opacityBase * 2)} inset`;
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
