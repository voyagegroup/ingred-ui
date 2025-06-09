import styled, { css } from "styled-components";
import { BadgeColor, BadgeType, BadgeSize } from "./types";
import { Theme } from "../../themes";

// 背景色の決定ロジック - 各タイプごとに明確に定義
export const getBackgroundColor = (key: BadgeColor, theme: Theme, type: BadgeType) => {
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
          return theme.palette.gray.light;
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
          return theme.palette.gray.dark;
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
export const getTextColor = (key: BadgeColor, theme: Theme, type: BadgeType) => {
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
          return theme.palette.text.primary;
        default:
          return theme.palette.text.primary;
      }
      
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
          return theme.palette.black;
        case "danger":
          return theme.palette.text.white;
        case "basic":
          return theme.palette.text.white;
        default:
          return theme.palette.text.white;
      }
      
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
        default:
          return theme.palette.text.primary;
      }
  }
};

// 共通のスタイル
const commonBadgeStyles = css<{
  size?: BadgeSize;
  fontSize: string;
  fontWeight: string;
}>`
  display: inline-flex;
  align-items: center;
  height: ${({ size = "medium" }) => (size === "small" ? "20px" : "24px")};
  text-align: center;
  font-size: ${({ size = "medium", fontSize }) =>
    size === "small" ? "12px" : fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-decoration: none;
`;

// Normal Badge
export const NormalBadge = styled.span<{
  color: string;
  backgroundColor: string;
  size?: BadgeSize;
  fontSize: string;
  fontWeight: string;
}>`
  ${commonBadgeStyles}
  padding: 0 ${({ size = "medium", theme }) =>
    size === "small"
      ? `${theme.spacing * 0.75}px`
      : `${theme.spacing}px`};
  border-radius: ${({ theme }) => `${theme.radius * 0.75}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  gap: ${({ size = "medium" }) => (size === "small" ? "2px" : "4px")};
`;

// Pill Badge
export const PillBadge = styled.span<{
  color: string;
  backgroundColor: string;
  size?: BadgeSize;
  fontSize: string;
  fontWeight: string;
}>`
  ${commonBadgeStyles}
  padding: 0 ${({ size = "medium", theme }) =>
    size === "small"
      ? `${theme.spacing * 0.75}px`
      : `${theme.spacing}px`};
  border-radius: 10rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  gap: ${({ size = "medium" }) => (size === "small" ? "2px" : "4px")};
`;

// Signal Badge Components
export const SignalWrapper = styled.span<{ size?: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.palette.basicDark.dark};
  border-radius: ${({ theme }) => theme.radius / 2}px;
  padding: ${({ theme }) => theme.spacing / 2}px;
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

export const SignalText = styled.span`
  display: inline-flex;
  align-items: center;
`;

// アイコン用のスタイル
export const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
`;
