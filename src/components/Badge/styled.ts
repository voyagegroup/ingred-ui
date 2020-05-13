import styled from "styled-components";

export type BadgeShape = "normal" | "pill";

type Props = {
  color: string;
  backgroundColor: string;
  shape: BadgeShape;
}

export const Container = styled.span<Props>`
  display: inline-block;
  padding: 0.25em ${({ shape }) => shape === "pill" ? "0.6" : "0.7"}em;
  border-radius: ${({ shape }) => shape === "pill" ? "10rem" : "4px"};
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
  font-size: 0.65em;
  font-weight: bold;
  color: ${({ color }) => color};
  text-decoration: none;
`;
