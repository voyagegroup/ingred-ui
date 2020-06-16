import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing * 2}px;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing}px;
`;
