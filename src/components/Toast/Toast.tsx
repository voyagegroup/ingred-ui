import React from "react";
import {
  useToasts,
  ToastProps,
  AppearanceTypes,
} from "react-toast-notifications";
import DefaultToast from "./DefaultToast";
import ToastProvider from "./ToastProvider";

type Props = {
  children: React.ReactNode;
  appearance: AppearanceTypes;
  onDismiss?: (id?: string | undefined) => void;
};

const defaultToastProps: Omit<ToastProps, "appearance" | "children"> = {
  autoDismiss: false,
  autoDismissTimeout: 0,
  isRunning: true,
  onDismiss: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onMouseEnter: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onMouseLeave: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  placement: "top-center",
  transitionDuration: 0,
  transitionState: "entered",
};

const Toast = (props: Props) => (
  <DefaultToast {...defaultToastProps} {...props} />
);
Toast.Provider = ToastProvider;
Toast.useToasts = useToasts;

export default Toast;
