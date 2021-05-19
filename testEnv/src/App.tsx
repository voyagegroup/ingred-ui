import React from 'react';
import {
  ThemeProvider,
  createTheme,
  Typography,
  Spacer,
  ClickAwayListener
} from 'ingred-ui';

function App() {
  const theme = createTheme();
  const [text, setText] = React.useState("not clicked");
  const handleClickInner = () => {
    console.log("clicked inner")
    setText("clicked inner");
  };
  const handleClickOuter = () => {
    console.log("clicked outer")
    setText("clicked outer");
  };
  return (
    <ThemeProvider theme={theme}>
      <Typography component="h1" size="xxxxxl" align="center">
        Create React App example
      </Typography>
      <ClickAwayListener onClickAway={handleClickOuter}>
        <div onClick={handleClickInner}>
          Click inner/outer me!!
          <div>hoehgoe</div>
        </div>
      </ClickAwayListener>
      <div>{text}</div>
     <Spacer pt={2} />
      <Typography color="secondary" size="xxl" align="center">
        Write some components in this environment.
      </Typography>
      <Spacer pt={2} />
      <Typography color="secondary" size="xxl" align="center">
        Copyright © <a href="https://ingred-ui.netlify.app/">Your Website</a> 2020.
      </Typography>
    </ThemeProvider>
  );
}

export default App;
