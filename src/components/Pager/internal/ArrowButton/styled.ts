import styled from "styled-components";

type ButtonProps = {
  disabled?: boolean;
};

export const ArrowButton = styled.button<ButtonProps>`
  width: 28px;
  height: 28px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radius}px;
  border: 0;
  transition: all 0.3s;
  &:first-child {
    margin-right: 14px;
  }
  &:last-child {
    margin-left: 14px;
  }
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.palette.gray.light : theme.palette.background.hint};
  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? theme.palette.gray.light : theme.palette.primary.highlight};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }
`;
