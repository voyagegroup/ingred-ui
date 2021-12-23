import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import DefaultToast from "..";
import { renderWithThemeProvider } from "../../../../utils/renderWithThemeProvider";
import { ToastProps } from "../../../../lib/react-toast-notification/src";

const toastProps: Omit<ToastProps, "children"> = {
  appearance: "info",
  autoDismiss: false,
  autoDismissTimeout: 0,
  isRunning: true,
  onDismiss: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  placement: "top-center",
  transitionDuration: 0,
  transitionState: "entered",
};

describe("DefaultToast component testing", () => {
  afterEach(cleanup);

  test("DefaultToast info", () => {
    const { asFragment } = renderWithThemeProvider(
      <DefaultToast {...toastProps} appearance="info">
        hoge
      </DefaultToast>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DefaultToast success", () => {
    const { asFragment } = renderWithThemeProvider(
      <DefaultToast {...toastProps} appearance="success">
        hoge
      </DefaultToast>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DefaultToast warning", () => {
    const { asFragment } = renderWithThemeProvider(
      <DefaultToast {...toastProps} appearance="warning">
        hoge
      </DefaultToast>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DefaultToast error", () => {
    const { asFragment } = renderWithThemeProvider(
      <DefaultToast {...toastProps} appearance="error">
        hoge
      </DefaultToast>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
