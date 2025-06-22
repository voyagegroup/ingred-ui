import { css, type DefaultTheme } from "styled-components";

export const focusInteraction = (theme: DefaultTheme, isError = false) => css`
  outline: none;
  border-color: ${isError
    ? theme.palette.danger.main
    : theme.palette.primary.main};
  box-shadow: 0 0 0 3px
    ${isError
      ? theme.palette.danger.highlight
      : theme.palette.primary.highlight};
`;
