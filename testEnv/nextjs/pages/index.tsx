import { createTheme, ThemeProvider, Typography, Spacer } from "ingred-ui";

export default function Home({ title }) {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Typography component="h1" size="xxxxxl" align="center">
        {title}
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
  );
}

export function getInitialProps() {
  return {
    props: {
      title: "Next.js + ingred-ui playground",
    },
  };
}
