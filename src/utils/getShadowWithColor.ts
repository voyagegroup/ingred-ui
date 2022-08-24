import { ShadowsType } from "../styles/shadows";
import { getColorWithOpacity } from "./getColorWithOpacity";

// shadow の色を theme.shadows で定義した色から変更したいときに使う
export const getShadowWithColor = (
  shadows: ShadowsType,
  tokenNumber: number,
  color?: string,
) => {
  if (color === undefined) return shadows[tokenNumber];

  switch (tokenNumber) {
    case 1:
    case 2:
    case 3:
      return shadows[tokenNumber]
        .replace(getColorWithOpacity(2), getColorWithOpacity(2, color))
        .replace(getColorWithOpacity(1), getColorWithOpacity(1, color));
    case 4:
      return shadows[4].replace(
        getColorWithOpacity(2),
        getColorWithOpacity(2, color),
      );
    case 5:
      return shadows[5].replace(
        getColorWithOpacity(2),
        getColorWithOpacity(2, color),
      );
    default:
      return "none";
  }
};
