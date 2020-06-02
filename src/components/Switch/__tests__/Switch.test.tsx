import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Switch from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Switch component testing", () => {
  afterEach(cleanup);

  test("Switch", () => {
    const { asFragment } = renderWithThemeProvider(
      <Switch
        cases={[
          {
            name: "デマンド別",
          },
          {
            name: "チャネル別",
          },
        ]}
        value={0}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
