import { hexToRgba } from "./hexToRgba";

export type TokenType = 1 | 2 | 3 | 4 | 5;

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
    default:
      return "none";
  }
};
