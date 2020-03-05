import React, { Component } from "react";

import { ThemeProvider, createTheme, Button } from "ingred-ui";

export default class App extends Component {
  render() {
    const theme = createTheme();
    return (
      <ThemeProvider theme={theme}>
        <Button>button</Button>
      </ThemeProvider>
    );
  }
}
