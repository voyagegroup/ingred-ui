import * as React from "react";
import ToastContainer from "./internal/ToastContainer";
import DefaultToast from "../DefaultToast";
import {
  ToastProvider as DefaultToastProvider,
  ToastProviderProps as DefaultToastProviderProps,
} from "../../../lib/react-toast-notification/src";

export type ToastProviderProps = DefaultToastProviderProps;

const ToastProvider: React.FunctionComponent<ToastProviderProps> = ({
  children,
  ...rest
}) => (
  <DefaultToastProvider
    {...rest}
    components={{
      ...{ Toast: DefaultToast, ToastContainer },
      ...rest.components,
    }}
  >
    {children}
  </DefaultToastProvider>
);

export default ToastProvider;
