import styled, { css } from "styled-components";
import { BadgeSize, BADGE_SIZE } from "./types";
import { trimVertical } from "../../styles/typography";

// 共通のスタイル
const commonBadgeStyles = css<{
  size?: BadgeSize;
  fontSize?: string;
  fontWeight?: string;
}>`
  display: inline-flex;
  align-items: center;
  text-align: center;
  font-size: ${({ size = "medium", fontSize }) =>
    fontSize || BADGE_SIZE[size].fontSize};
  font-weight: ${({ fontWeight = "normal" }) => fontWeight};
  text-decoration: none;
  ${trimVertical}
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
  padding: 0 ${({ size = "medium", theme }) => BADGE_SIZE[size].padding(theme)};
  border-radius: ${({ theme }) => `${theme.radius * 0.75}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  gap: ${({ size = "medium" }) => BADGE_SIZE[size].gap};
  height: ${({ size = "medium" }) => BADGE_SIZE[size].height};
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
  padding: 0 ${({ size = "medium", theme }) => BADGE_SIZE[size].padding(theme)};
  border-radius: 10rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  height: ${({ size = "medium" }) => BADGE_SIZE[size].pillHeight};
`;

// Signal Badge Components
export const SignalWrapper = styled.span<{
  size?: BadgeSize;
  fontSize?: string;
  fontWeight?: string;
}>`
  ${commonBadgeStyles}
  gap: ${({ size = "medium", theme }) => BADGE_SIZE[size].signalGap(theme)};
  border: 1px solid ${({ theme }) => theme.palette.basicDark.dark};
  border-radius: 10rem;
  padding: 0
    ${({ size = "medium", theme }) => BADGE_SIZE[size].signalPadding(theme)};
  height: ${({ size = "medium" }) => BADGE_SIZE[size].pillHeight};
`;

export const SignalDot = styled.span<{
  backgroundColor: string;
  size?: BadgeSize;
}>`
  display: inline-block;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ size = "medium" }) => BADGE_SIZE[size].dotSize};
  height: ${({ size = "medium" }) => BADGE_SIZE[size].dotSize};
`;

// アイコン用のスタイル
export const Icon = styled.span``;
