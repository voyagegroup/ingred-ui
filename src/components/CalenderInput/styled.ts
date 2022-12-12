import styled, { DefaultTheme } from "styled-components";

const setBorderColor = (
  theme: DefaultTheme,
  isFocused: boolean,
  isError: boolean,
) => {
  if (isError) return theme.palette.danger.main;
  else if (isFocused) return theme.palette.primary.main;
  else return theme.palette.divider;
};

export const Container = styled.div<{ isFocused: boolean; isError: boolean }>`
  display: "flex";
  width: 140px;
  padding: 8px 8px;
  font-size: 14px;
  color: ${({ theme, isError }) =>
    isError ? theme.palette.danger.main : theme.palette.black};
  background-color: ${({ theme }) => theme.palette.background.default};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  border-color: ${({ theme, isFocused, isError }) =>
    setBorderColor(theme, isFocused, isError)};
`;

export const Input = styled.input<{ letterCount: number; isError: boolean }>`
  text-align: right;
  border: none;
  width: ${({ letterCount }) => 8 * letterCount}px;
  padding: 2px 0px;
  color: ${({ theme, isError }) =>
    isError ? theme.palette.danger.main : theme.palette.black};
  &:focus {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.white};
    outline: none;
  }
`;
