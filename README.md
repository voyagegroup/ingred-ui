![logo.png](https://user-images.githubusercontent.com/15682771/84245728-7789d600-ab40-11ea-80c5-52b64b736c4e.png)

# ingred-ui

>

[![NPM](https://img.shields.io/npm/v/ingred-ui.svg)](https://www.npmjs.com/package/ingred-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

For npm users:

```bash
npm install --save ingred-ui styled-components
```

For Yarn users:

```bash
yarn add ingred-ui styled-components
```

## Usage

```tsx
import * as React from "react";

import { ThemeProvider, createTheme, Button } from "ingred-ui";

class Example extends React.Component {
  render() {
    const theme = createTheme();
    return (
      <ThemeProvider theme={theme}>
        <Button>Sample</Button>
      </ThemeProvider>
    );
  }
}
```

`<DatePicker />`を使う場合は

```tsx
import "react-dates/lib/css/_datepicker.css";
```

を追記してください

## License

MIT © [voyagegroup](https://github.com/voyagegroup)
