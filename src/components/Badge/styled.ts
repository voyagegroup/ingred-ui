import styled from "styled-components";

type Props = {
  color: string;
  backgroundColor: string;
}

export const Container = styled.span<Props>`
  display: inline-block;
  padding: 0.25em 0.4em;
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;
  font-size: 0.65em;
  font-weight: bold;
  color: ${({ color }) => color};
  text-decoration: none;
`;
