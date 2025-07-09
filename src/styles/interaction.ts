import { css } from "styled-components";
import { Theme } from "../themes/createTheme";

export const createFocusInteraction = (theme: Theme) => {
  return (isError = false) => {
    const color = isError
      ? theme.palette.danger.highlight
      : theme.palette.primary.highlight;

    // NOTE: cssをつけないと文字列がそのまま展開されて改行などが含まれてしまう
    return css`
      outline: none;
      border-color: ${isError
        ? theme.palette.danger.main
        : theme.palette.primary.main};
      box-shadow: 0 0 0 3px ${color};
    `;
  };
};
