import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import ItemEmpty from "../ItemEmpty";

describe("ItemEmpty component testing", () => {
  afterEach(cleanup);

  test("ItemEmpty", () => {
    const { asFragment } = renderWithThemeProvider(
      <ItemEmpty title="title" subtitle="subtitle" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
