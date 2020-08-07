import styled from "styled-components";

export const Container = styled.div<{ inline: boolean }>`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  padding: ${({ theme }) => theme.spacing}px 0;
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const TextContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
  margin: 0 ${({ theme }) => theme.spacing}px;
  padding: 0 ${({ theme }) => theme.spacing}px;
  border-radius: ${({ theme }) => theme.radius}px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.gray.main};
  }
`;
