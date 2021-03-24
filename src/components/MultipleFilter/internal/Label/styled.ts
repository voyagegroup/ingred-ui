import styled from "styled-components";

export const Container = styled.div`
  width: 48px;
  background-color: ${({ theme }) => theme.palette.gray.light};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  color: ${({ theme }) => theme.palette.black};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftContainer = styled.div``;

export const RightContainer = styled.div``;
