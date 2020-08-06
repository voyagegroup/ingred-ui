import styled from "styled-components";

export const Container = styled.div<{
  boxShadow: string;
  background: string;
}>`
  position: relative;
  min-width: 320px;
  max-width: 400px;
  padding-top: ${({ theme }) => theme.spacing * 2}px;
  padding-right: ${({ theme }) => theme.spacing * 6}px;
  padding-bottom: ${({ theme }) => theme.spacing * 2}px;
  padding-left: ${({ theme }) => theme.spacing * 2}px;
  background: ${({ background }) => background};
  box-shadow: ${({ boxShadow }) => boxShadow};
  border-radius: ${({ theme }) => theme.radius}px;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing}px;
  right: ${({ theme }) => theme.spacing}px;
  cursor: pointer;
`;
