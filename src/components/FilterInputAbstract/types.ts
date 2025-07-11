import { Theme } from "../../themes";

export type FilterSize = "small" | "medium" | "large";

export type FilterVariant = "light" | "dark";

export type FilterSizeProps = {
  size?: FilterSize;
};

export type FilterSizeConfig = {
  height: string;
  borderRadius: string;
  iconSize: string;
  arrowIconSize: string;
  padding: string;
};

export type FilterVariantConfig = {
  background: string;
};

export const FILTER_SIZES: Record<FilterSize, FilterSizeConfig> = {
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

export const getFilterVariantConfig = (
  theme: Theme,
): Record<FilterVariant, FilterVariantConfig> => ({
  light: {
    background: theme.palette.background.default,
  },
  dark: {
    background: theme.palette.basicDark.ultraLight,
  },
});
