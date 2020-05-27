import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  vertical-align: middle;
`;

type BadgeProps = {
  variant: "dot" | "normal";
  position: string;
  size: string;
  invisible: boolean;
};

const dotSizeMapping: { [size in string]: string } = {
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
  transform: ${({ invisible }) => (invisible ? "scale(0)" : "scale(1)")}
    translate(
      ${({ position }) =>
        ["top-right", "bottom-right"].includes(position) ? "50%" : "-50%"},
      ${({ position }) =>
        ["bottom-right", "bottom-left"].includes(position) ? "50%" : "-50%"}
    );
  transform-origin: ${({ position }) =>
    `${["top-right", "bottom-right"].includes(position) ? "100%" : "0%"} ${
      ["bottom-right", "bottom-left"].includes(position) ? "100%" : "0%"
    }`};
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: ${({ variant, size }) =>
    variant === "normal" ? "20px" : dotSizeMapping[size]};
  min-width: ${({ variant, size }) =>
    variant === "normal" ? "20px" : dotSizeMapping[size]};
  line-height: 1;
  padding: 0 ${({ variant }) => (variant === "normal" ? "6px" : 0)};
  border-radius: 10rem;
  color: ${({ theme }) => theme.palette.text.white};
  background-color: ${({ theme }) => theme.palette.danger.main};
  font-size: 10.5px;
  font-weight: bold;
  transition: transform 0.3s;
`;
