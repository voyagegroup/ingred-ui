import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import ScrollArea from "../";

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
