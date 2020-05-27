import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import NotificationBadge from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("NotificationBadge component testing", () => {
  afterEach(cleanup);

  test("NotificationBadge normal", () => {
    const { asFragment } = renderWithThemeProvider(
      <NotificationBadge variant="normal" badgeContent={1}>
        text
      </NotificationBadge>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("NotificationBadge dot", () => {
    const { asFragment } = renderWithThemeProvider(
      <NotificationBadge variant="dot">text</NotificationBadge>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
