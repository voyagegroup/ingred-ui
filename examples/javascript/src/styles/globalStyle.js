import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Noto Sans JP";
    src: "https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700,900&display=swap";
    font-display: swap;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
  }

  html,
  body {
    font-size: 14px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    width: 100%;
    height: 100%;
    font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Proxima Nova",
      Verdana, "游ゴシック", YuGothic, Meiryo, sans-serif;
  }

  #app {
    width: 100%;
    height: 100%;
  }
`;
