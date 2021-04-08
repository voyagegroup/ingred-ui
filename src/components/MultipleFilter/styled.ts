import styled from "styled-components";

export const Container = styled.div<{ isFocused: boolean }>`
  border: 1px solid
    ${({ theme, isFocused }) =>
      isFocused ? theme.palette.primary.main : theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  display: flex;
`;

export const InputContiner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  & > input {
    border: none;
    padding-left: 12px;
  }
`;

export const LabelContainer = styled.div`
  padding-left: 10px;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
  flex-grow: 0;
`;

export const CenterContainer = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  flex-grow: 1;
`;

export const RightContainer = styled.div`
  flex-grow: 0;
  display: flex;
  align-items: center;
  padding-right: 19px;
`;
export const IconContainer = styled.div``;
