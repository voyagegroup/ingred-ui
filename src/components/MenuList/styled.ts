import styled from "styled-components";

export const Container = styled.div<{ inline: boolean }>`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  padding: ${({ theme }) => theme.spacing * 1.25}px 0;
  box-shadow: 0px 0px 16px ${({ theme }) => theme.palette.gray.main}67;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const TextContainer = styled.div`
  cursor: pointer;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing * 2}px;
  line-height: 32px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
