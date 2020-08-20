import React from "react";
import {
  useToasts,
  ToastProps as DefaultToastProps,
} from "react-toast-notifications";
import DefaultToast from "./DefaultToast";
import ToastProvider from "./ToastProvider";

export type ToastProps = DefaultToastProps;

const defaultToastProps: ToastProps = {
  appearance: "info",
  autoDismiss: false,
  autoDismissTimeout: 0,
  isRunning: true,
  onDismiss: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onMouseEnter: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onMouseLeave: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  placement: "top-center",
  transitionDuration: 0,
  transitionState: "entered",
  children: null,
};

const Toast = (props: Partial<ToastProps>) => (
  <DefaultToast {...defaultToastProps} {...props} />
);
Toast.Provider = ToastProvider;
Toast.useToasts = useToasts;

export default Toast;
