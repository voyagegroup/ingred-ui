import styled from "styled-components";

export type BadgeType = "normal" | "pill";

type Props = {
  color: string;
  backgroundColor: string;
  type: BadgeType;
  fontSize: string;
  fontWeight: string;
};

export const Container = styled.span<Props>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing / 2}px ${theme.spacing}px`};
  border-radius: ${({ type, theme }) =>
    type === "pill" ? "10rem" : `${theme.radius}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
  text-decoration: none;
`;
