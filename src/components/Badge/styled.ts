import styled, { css } from "styled-components";
import { BadgeColor, BadgeType, BadgeSize } from "./types";
import { Theme } from "../../themes";
import { trimVertical } from "../../styles/typography";

// 背景色の決定ロジック - 各タイプごとに明確に定義
export const getBackgroundColor = (
  key: BadgeColor,
  theme: Theme,
  type: BadgeType,
) => {
  switch (type) {
    // normalタイプの背景色
    case "normal":
      switch (key) {
        case "primary":
          return theme.palette.primary.highlight;
        case "secondary":
          return theme.palette.basicDark.dark;
        case "success":
          return theme.palette.success.softlight || theme.palette.success.light;
        case "warning":
          return theme.palette.warning.highlight;
        case "danger":
          return theme.palette.danger.highlight;
        case "basic":
          return theme.palette.black;
      }
      break;

    // pillタイプの背景色
    case "pill":
      switch (key) {
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.basicDark.light;
        case "success":
          return theme.palette.success.main;
        case "warning":
          return theme.palette.warning.main;
        case "danger":
          return theme.palette.danger.main;
        case "basic":
          return theme.palette.black;
      }
      break;

    // signalタイプのドットの色
    case "signal":
      switch (key) {
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.gray.dark;
        case "success":
          return theme.palette.success.main;
        case "warning":
          return theme.palette.warning.main;
        case "danger":
          return theme.palette.danger.main;
        case "basic":
          return theme.palette.black;
      }
      break;
  }
};

// テキスト色の決定ロジック - 各タイプごとに明確に定義
export const getTextColor = (
  key: BadgeColor,
  theme: Theme,
  type: BadgeType,
) => {
  switch (type) {
    // normalタイプのテキスト色
    case "normal":
      switch (key) {
        case "primary":
          return theme.palette.text.primary;
        case "success":
          return theme.palette.success.deepDark;
        case "danger":
          return theme.palette.danger.deepDark;
        case "secondary":
          return theme.palette.text.secondary;
        case "warning":
          return theme.palette.warning.deepDark;
        case "basic":
          return theme.palette.text.white;
      }
      break;

    // pillタイプのテキスト色
    case "pill":
      switch (key) {
        case "primary":
          return theme.palette.text.white;
        case "secondary":
          return theme.palette.text.secondary;
        case "success":
          return theme.palette.text.white;
        case "warning":
          return theme.palette.warning.deepDark;
        case "danger":
          return theme.palette.text.white;
        case "basic":
          return theme.palette.text.white;
      }
      break;

    // signalタイプのテキスト色
    case "signal":
      switch (key) {
        case "primary":
          return theme.palette.text.primary;
        case "secondary":
          return theme.palette.text.secondary;
        case "success":
          return theme.palette.success.deepDark;
        case "warning":
          return theme.palette.warning.deepDark;
        case "danger":
          return theme.palette.danger.deepDark;
        case "basic":
          return theme.palette.text.primary;
      }
      break;
  }
};

// 共通のスタイル
const commonBadgeStyles = css<{
  size?: BadgeSize;
  fontSize?: string;
  fontWeight?: string;
}>`
  display: inline-flex;
  align-items: center;
  text-align: center;
  font-size: ${({ size = "medium", fontSize = "13px" }) =>
    size === "small" ? "12px" : fontSize};
  font-weight: ${({ fontWeight = "normal" }) => fontWeight};
  text-decoration: none;
`;

// Normal Badge
export const NormalBadge = styled.span<{
  color: string;
  backgroundColor: string;
  size?: BadgeSize;
  fontSize?: string;
  fontWeight?: string;
}>`
  ${commonBadgeStyles}
  padding: 0 ${({ size = "medium", theme }) =>
    size === "small" ? `${theme.spacing * 0.75}px` : `${theme.spacing}px`};
  border-radius: ${({ theme }) => `${theme.radius * 0.75}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  gap: ${({ size = "medium" }) => (size === "small" ? "2px" : "4px")};
  height: ${({ size = "medium" }) => (size === "small" ? "22px" : "24px")};
`;

// Pill Badge
export const PillBadge = styled.span<{
  color: string;
  backgroundColor: string;
  size?: BadgeSize;
  fontSize?: string;
  fontWeight?: string;
}>`
  ${commonBadgeStyles}
  padding: 0 ${({ size = "medium", theme }) =>
    size === "small" ? `${theme.spacing * 0.75}px` : `${theme.spacing}px`};
  border-radius: 10rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  height: ${({ size = "medium" }) => (size === "small" ? "20px" : "24px")};
`;

// Signal Badge Components
export const SignalWrapper = styled.span<{
  size?: BadgeSize;
  fontWeight?: string;
}>`
  ${commonBadgeStyles}
  gap: ${({ size = "medium", theme }) =>
    size === "small" ? `${theme.spacing / 2}px` : `${theme.spacing * 0.75}px`};
  border: 1px solid ${({ theme }) => theme.palette.basicDark.dark};
  border-radius: 10rem;
  padding: 0
    ${({ size = "medium", theme }) =>
      size === "small"
        ? `${theme.spacing / 2}px`
        : `${theme.spacing * 0.75}px`};
  height: ${({ size = "medium" }) => (size === "small" ? "20px" : "24px")};
`;

export const SignalDot = styled.span<{
  backgroundColor: string;
  size?: BadgeSize;
}>`
  display: inline-block;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ size = "medium" }) => (size === "small" ? "10px" : "12px")};
  height: ${({ size = "medium" }) => (size === "small" ? "10px" : "12px")};
`;

export const SignalText = styled.span<{
  size?: BadgeSize;
}>`
  ${trimVertical}
`;

// アイコン用のスタイル
export const Icon = styled.span``;

// テキスト用のスタイル
export const Text = styled.span<{
  size?: BadgeSize;
}>`
  ${trimVertical}
`;
