import styled from "styled-components";
import { colors } from "../../styles/color";
import { Radius } from "../../styles";

export const Container = styled.div<{ inline: boolean }>`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  padding: ${({ theme }) => theme.spacing}px 0;
  border-radius: ${Radius.SMALL};
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const TextContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
  margin: 0 ${({ theme }) => theme.spacing}px;
  padding: 0 ${({ theme }) => theme.spacing}px;
  border-radius: ${Radius.SMALL};
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  &:active {
    background-color: ${colors.basic[300]};
  }
`;
