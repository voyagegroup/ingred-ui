import { ThemeProvider, createTheme, Typography, Spacer } from "ingred-ui";
import React, { StrictMode } from "react";

function App() {
  const theme = createTheme();
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Typography component="h1" size="xxxxxl" align="center">
          Create React App example
        </Typography>
        <Spacer pt={2} />
        <Typography color="secondary" size="xxl" align="center">
          Write some components in this environment.
        </Typography>
        <Spacer pt={2} />
        <Typography color="secondary" size="xxl" align="center">
          Copyright © <a href="https://ingred-ui.netlify.app/">Your Website</a>{" "}
          2022.
        </Typography>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
