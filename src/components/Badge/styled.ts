import styled from "styled-components";

export type BadgeType = "normal" | "pill";

type Props = {
  color: string;
  backgroundColor: string;
  type: BadgeType;
  fontSize: string;
  fontWeight: string;
}

export const Container = styled.span<Props>`
  display: inline-block;
  padding: 0.25em 0.7em;
  border-radius: ${({ type }) => type === "pill" ? "1em" : "4px"};
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
  text-decoration: none;
`;
