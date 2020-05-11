import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Pager from "../Pager";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Pager component testing", () => {
  afterEach(cleanup);

  test("Pager", () => {
    const { asFragment } = renderWithThemeProvider(
      <Pager per={10} total={100} index={1} onClick={jest.fn} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
