import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Tabs from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Tabs component testing", () => {
  afterEach(cleanup);

  test("Tabs", () => {
    const options = {
      data: [
        { text: "hoge", value: "hoge" },
        { text: "fuga", value: "fuga" },
      ],
    };
    const { asFragment } = renderWithThemeProvider(
      <Tabs {...options} value={"hoge"} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Tabs with badge", () => {
    const options = {
      data: [
        { text: "hoge", count: 1, value: "hoge" },
        { text: "fuga", count: 2, value: "fuga" },
        { text: "piyo", count: 3, value: "piyo" },
      ],
    };
    const { asFragment } = renderWithThemeProvider(
      <Tabs {...options} value={"hoge"} withBadge={true} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
