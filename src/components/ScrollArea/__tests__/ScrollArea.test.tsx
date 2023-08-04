import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import ScrollArea from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("ScrollArea component testing", () => {
  afterEach(cleanup);

  test("ScrollArea", () => {
    const { asFragment } = renderWithThemeProvider(
      <ScrollArea>
        <div>hoge</div>
      </ScrollArea>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
