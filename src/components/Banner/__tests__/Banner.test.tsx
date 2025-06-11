import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import Banner from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Banner component testing", () => {
  afterEach(cleanup);

  test("Banner with type info", () => {
    const { asFragment } = renderWithThemeProvider(
      <Banner type="info" message="Info message" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Banner with type warning", () => {
    const { asFragment } = renderWithThemeProvider(
      <Banner type="warning" message="Warning message" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Banner with type error", () => {
    const { asFragment } = renderWithThemeProvider(
      <Banner type="error" message="Error message" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Small size banner", () => {
    const { asFragment } = renderWithThemeProvider(
      <Banner type="info" size="small" message="Small size banner" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Medium size banner", () => {
    const { asFragment } = renderWithThemeProvider(
      <Banner type="info" size="medium" message="Medium size banner" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Banner with children", () => {
    const { asFragment } = renderWithThemeProvider(
      <Banner type="info">
        <div>Custom content inside banner</div>
      </Banner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Banner with complex children", () => {
    const { asFragment } = renderWithThemeProvider(
      <Banner type="warning">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src="https://via.placeholder.com/24"
            alt="Icon"
            width="24"
            height="24"
          />
          <span>Content with image</span>
        </div>
      </Banner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
