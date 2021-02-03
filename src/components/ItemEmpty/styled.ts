import styled from "styled-components";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing * 5}px
    ${({ theme }) => theme.spacing * 4}px ${({ theme }) => theme.spacing * 7}px;
`;

export const EmptyImage = styled.img<{ width: number }>`
  width: ${({ width }) => width}px;
  height: auto;
`;
