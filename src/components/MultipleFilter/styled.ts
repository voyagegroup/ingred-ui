import styled from "styled-components";

export const Container = styled.div<{ isFocused: boolean }>`
  border: 1px solid
    ${({ theme, isFocused }) =>
      isFocused ? theme.palette.primary.main : theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: -8px;
  & > input {
    border: none;
    padding: 0 0 0 12px;
    flex-grow: 1;
    margin-bottom: 8px;
  }
`;

export const LabelContainer = styled.div`
  padding-left: 8px;
  margin-bottom: 8px;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
  flex-grow: 0;
`;

export const CenterContainer = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  flex-grow: 1;
  min-height: 40px;
  display: flex;
  align-items: center;
`;

export const RightContainer = styled.div`
  flex-grow: 0;
  display: flex;
  align-items: center;
  padding-right: 19px;
`;

export const IconContainer = styled.div``;
