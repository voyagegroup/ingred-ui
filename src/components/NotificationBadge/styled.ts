import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  vertical-align: middle;
`;

export type BadgeProps = {
  variant: "dot" | "normal";
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  size: "small" | "medium" | "large";
};

const dotSizeMapping: { [size in BadgeProps["size"]]: string } = {
  small: "8px",
  medium: "12px",
  large: "16px",
};

export const Badge = styled.span<BadgeProps>`
  position: absolute;
  top: ${({ position }) =>
    ["top-right", "top-left"].includes(position) ? 0 : "auto"};
  bottom: ${({ position }) =>
    ["bottom-right", "bottom-left"].includes(position) ? 0 : "auto"};
  right: ${({ position }) =>
    ["top-right", "bottom-right"].includes(position) ? 0 : "auto"};
  left: ${({ position }) =>
    ["top-left", "bottom-left"].includes(position) ? 0 : "auto"};
  transform: translate(
    ${({ position }) =>
      ["top-right", "bottom-right"].includes(position) ? "50%" : "-50%"},
    ${({ position }) =>
      ["bottom-right", "bottom-left"].includes(position) ? "50%" : "-50%"}
  );
  display: flex;
  align-items: center;
  align-content: center;
  height: ${({ variant, size }) =>
    variant === "normal" ? "20px" : dotSizeMapping[size]};
  min-width: ${({ variant, size }) =>
    variant === "normal" ? "20px" : dotSizeMapping[size]};
  padding: 0 ${({ variant }) => (variant === "normal" ? "6px" : 0)};
  border-radius: 10rem;
  color: ${({ theme }) => theme.palette.text.white};
  background-color: ${({ theme }) => theme.palette.danger.main};
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 1;
`;
