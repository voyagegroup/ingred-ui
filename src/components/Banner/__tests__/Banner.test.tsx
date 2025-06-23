import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup, screen, fireEvent } from "@testing-library/react";
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

  // アクセシビリティ関連のテスト
  test("Info banner has correct accessibility attributes", () => {
    renderWithThemeProvider(<Banner type="info" message="Info message" />);
    const banner = screen.getByText("Info message").closest("div[role]");
    expect(banner).toHaveAttribute("role", "status");
    expect(banner).toHaveAttribute("aria-live", "polite");
  });

  test("Warning banner has correct accessibility attributes", () => {
    renderWithThemeProvider(
      <Banner type="warning" message="Warning message" />,
    );
    const banner = screen.getByText("Warning message").closest("div[role]");
    expect(banner).toHaveAttribute("role", "alert");
    expect(banner).toHaveAttribute("aria-live", "polite");
  });

  test("Error banner has correct accessibility attributes", () => {
    renderWithThemeProvider(<Banner type="error" message="Error message" />);
    const banner = screen.getByText("Error message").closest("div[role]");
    expect(banner).toHaveAttribute("role", "alert");
    expect(banner).toHaveAttribute("aria-live", "assertive");
  });

  // 閉じる機能のテスト
  test("Banner with onClose renders close button", () => {
    renderWithThemeProvider(
      <Banner type="info" message="Closable banner" onClose={() => {}} />,
    );
    const closeButton = screen.getByLabelText("閉じる");
    expect(closeButton).toBeInTheDocument();

    // Closeボタンのアイコンが存在することを確認
    const iconElement = closeButton.querySelector("span");
    expect(iconElement).toBeInTheDocument();
  });

  test("Close button triggers onClose callback", () => {
    const handleClose = jest.fn();
    renderWithThemeProvider(
      <Banner type="info" message="Closable banner" onClose={handleClose} />,
    );
    const closeButton = screen.getByLabelText("閉じる");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("Banner without onClose prop doesn't render close button", () => {
    renderWithThemeProvider(
      <Banner type="info" message="Non-closable banner" />,
    );
    const closeButton = screen.queryByLabelText("閉じる");
    expect(closeButton).not.toBeInTheDocument();
  });
});
