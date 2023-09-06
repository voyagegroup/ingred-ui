![logo.png](https://github.com/voyagegroup/ingred-ui/assets/50351271/6d5bfbbe-96ba-435a-96a3-9b3f022626db)
INGRED UI is a design system developed to make it easy and quick for anyone to build a user interface.
It is based on React and has a well thought out structure that works well with TypeScript.

>

[![NPM](https://img.shields.io/npm/v/ingred-ui.svg)](https://www.npmjs.com/package/ingred-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/be195faf-d125-4654-8332-7ed36e1e9b2a/deploy-status)](https://app.netlify.com/sites/ingred-ui/deploys)

## Install

For npm users:

```bash
npm install --save ingred-ui styled-components
```

For yarn users:

```bash
yarn add ingred-ui styled-components
```

For pnpm users:

```bash
pnpm add ingred-ui styled-components
```

## Usage

```tsx
import * as React from "react";

import { ThemeProvider, createTheme, Button } from "ingred-ui";

const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Button>Sample</Button>
    </ThemeProvider>
  );
};
```

If you use `<DatePicker />` or `<DateRangePicker />` , add

```tsx
import "react-dates/lib/css/_datepicker.css";
```

## License

MIT © [CARTA HOLDINGS, Inc.](https://github.com/voyagegroup)
