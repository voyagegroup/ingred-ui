import React, { VFC } from "react";
import styles from "./ThemeProvider.module.css"
import {
  ThemeProvider as IngredUiThemeProvider,
  createTheme,
} from "../../../../src/themes";

type Props = {
  children: React.ReactNode;
};

const ThemeProvider: VFC<Props> = (props) => {
  const { children } = props;
  const theme = createTheme();
  return (
    <IngredUiThemeProvider theme={theme}>
      <section className={styles.wrapper}>
        {children}
      </section>
    </IngredUiThemeProvider>
  );
};

export default ThemeProvider;
