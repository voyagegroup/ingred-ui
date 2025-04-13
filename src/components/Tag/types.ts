import { colors } from "../../styles";

export type TagSize = "small" | "medium" | "large";
export type TagVariant = "light" | "dark";

export type TagProps = {
  label: string;
  size?: TagSize;
  variant?: TagVariant;
  onRemove?: () => void;
  className?: string;
  disabled?: boolean;
};

export const TAG_SIZES = {
  small: {
    height: "20px",
    fontSize: "11px",
    padding: "2px 6px",
    iconSize: "14px",
    borderRadius: "2px",
  },
  medium: {
    height: "22px",
    fontSize: "12px",
    padding: "2px 7px",
    iconSize: "16px",
    borderRadius: "4px",
  },
  large: {
    height: "26px",
    fontSize: "13px",
    padding: "3px 8px",
    iconSize: "18px",
    borderRadius: "4px",
  },
} as const;

export const TAG_VARIANTS = {
  light: {
    background: colors.basic[0],
    border: colors.basic[400],
    text: colors.basic[900],
    hoverIcon: colors.basic[800],
  },
  dark: {
    background: colors.basic[100],
    border: colors.basic[400],
    text: colors.basic[900],
    hoverIcon: colors.basic[800],
  },
} as const;
