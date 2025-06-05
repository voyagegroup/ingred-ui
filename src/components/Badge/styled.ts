import styled from "styled-components";

export type BadgeType = "normal" | "pill" | "signal";
export type BadgeSize = "medium" | "small";

type Props = {
  color: string;
  backgroundColor: string;
  type: BadgeType;
  fontSize: string;
  fontWeight: string;
};

export const Container = styled.span<Props & { size?: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ size = "medium", theme }) =>
    size === "small"
      ? `${theme.spacing / 3}px ${theme.spacing * 0.75}px`
      : `${theme.spacing / 2}px ${theme.spacing}px`};
  border-radius: ${({ type, theme }) =>
    type === "pill" ? "10rem" : `${theme.radius}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
  font-size: ${({ size = "medium", fontSize }) =>
    size === "small" ? "11px" : fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
  text-decoration: none;
  gap: 4px;

  .badge-icon {
    display: inline-flex;
    align-items: center;
    &.badge-icon-left {
      margin-right: 4px;
    }
    &.badge-icon-right {
      margin-left: 4px;
    }
    svg {
      width: 1em;
      height: 1em;
    }
  }
`;

export const SignalContainer = styled.span<{
  color: string;
  backgroundColor: string;
  size?: BadgeSize;
}>`
  display: inline-block;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ size = "medium" }) => (size === "small" ? "8px" : "12px")};
  height: ${({ size = "medium" }) => (size === "small" ? "8px" : "12px")};
`;

export const SignalWrapper = styled.span<{ size?: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
