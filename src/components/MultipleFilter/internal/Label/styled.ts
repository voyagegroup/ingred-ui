import styled from "styled-components";

export const Container = styled.div`
  padding-right: 8px;
  padding-left: 8px;
  width: auto;
  height: 24px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  color: ${({ theme }) => theme.palette.black};
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightContainer = styled.div`
  padding-left: 10px;
`;

export const IconContainer = styled.div``;
