import styled from "styled-components";

export const Container = styled.div<{ isFocused: boolean }>`
  border: 1px solid
    ${({ theme, isFocused }) =>
      isFocused ? theme.palette.primary.main : theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  display: flex;
`;

export const InputContiner = styled.div`
  & > input {
    border: none;
    padding-left: 12px;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
`;

export const RightContainer = styled.div`
  padding: 12px;
`;
