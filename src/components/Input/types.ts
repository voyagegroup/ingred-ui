import { Theme } from "../../themes";

export type InputSize = "small" | "medium" | "large";
export type InputVariant = "light" | "dark";

export type InputSizeConfig = {
  height: string;
  fontSize: string;
  padding: string;
  borderRadius: string;
};

// テキストエリア用の固定パディング
export const TEXTAREA_PADDING = "8px";

export const INPUT_SIZES: Record<InputSize, InputSizeConfig> = {
  small: {
    height: "28px",
    fontSize: "12px",
    padding: "0 6px",
    borderRadius: "4px",
  },
  medium: {
    height: "32px",
    fontSize: "13px",
    padding: "0 8px",
    borderRadius: "6px",
  },
  large: {
    height: "40px",
    fontSize: "14px",
    padding: "0 10px",
    borderRadius: "6px",
  },
};

export type InputVariantConfig = {
  background: string;
  borderColor: string;
  hoverBorderColor: string;
  focusBorderColor: string;
  focusShadowColor: string;
};

// この関数はコンポーネント内でuseMemoを使用して呼び出すことで最適化できます
export const getInputVariantConfig = (
  theme: Theme,
): Record<InputVariant, InputVariantConfig> => ({
  light: {
    background: theme.palette.background.default, // 白背景
    borderColor: theme.palette.divider,
    hoverBorderColor: theme.palette.primary.main,
    focusBorderColor: theme.palette.primary.main,
    focusShadowColor: `${theme.palette.primary.light}66`, // 青色 + 40%透明度
  },
  dark: {
    background: theme.palette.basicDark.ultraLight, // グレー背景
    borderColor: theme.palette.divider,
    hoverBorderColor: theme.palette.primary.main,
    focusBorderColor: theme.palette.primary.main,
    focusShadowColor: `${theme.palette.primary.light}66`, // 青色 + 40%透明度
  },
});

// エラー状態用のスタイル設定（スタイルの重複を減らすため）
export const getErrorStyles = (theme: Theme) => ({
  borderColor: theme.palette.danger.main,
  shadowColor: `${theme.palette.danger.light}66`, // 赤色 + 40%透明度
});
