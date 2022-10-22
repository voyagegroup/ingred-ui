import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";
import { App } from "./App";

export function render(url, context) {
  const sheet = new ServerStyleSheet();
  const appHtml = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    )
  );
  const styleTags = sheet.getStyleTags();
  console.log({ appHtml, styleTags });
  return { appHtml, styleTags };
}
