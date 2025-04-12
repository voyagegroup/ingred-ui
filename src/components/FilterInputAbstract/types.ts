import { colors } from "../../styles";

export type FilterSize = "small" | "medium" | "large";

export type FilterVariant = "light" | "dark";

export type FilterSizeProps = {
  size?: FilterSize;
};

export const FILTER_SIZES = {
  small: {
    height: "28px",
    borderRadius: "4px",
    iconSize: "20px",
    arrowIconSize: "16px",
    padding: "0 2px 0 6px",
  },
  medium: {
    height: "32px",
    borderRadius: "6px",
    iconSize: "22px",
    arrowIconSize: "18px",
    padding: "0 2px 0 6px",
  },
  large: {
    height: "40px",
    borderRadius: "6px",
    iconSize: "24px",
    arrowIconSize: "20px",
    padding: "0 4px 0 8px",
  },
} as const;

export const FILTER_VARIANTS = {
  light: {
    background: colors.basic[0],
  },
  dark: {
    background: colors.basic[100],
  },
} as const;
