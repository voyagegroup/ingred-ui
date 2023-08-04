import * as React from "react";
import {
  ToastProvider as DefaultToastProvider,
  ToastProviderProps as DefaultToastProviderProps,
} from "../../../lib/react-toast-notification/src";
import DefaultToast from "../DefaultToast";
import ToastContainer from "./internal/ToastContainer";

export type ToastProviderProps = DefaultToastProviderProps & {
  children: React.ReactNode;
};

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
