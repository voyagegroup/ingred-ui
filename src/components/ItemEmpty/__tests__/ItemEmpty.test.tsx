import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import ItemEmpty from "../ItemEmpty";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("ItemEmpty component testing", () => {
  afterEach(cleanup);

  test("ItemEmpty", () => {
    const { asFragment } = renderWithThemeProvider(
      <ItemEmpty title="title" subtitle="subtitle" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
