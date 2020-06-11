import * as React from "react";
import {
  ToastProvider as DefaultToastProvider,
  ToastProviderProps,
} from "react-toast-notifications";
import ToastContainer from "./internal/ToastContainer";
import DefaultToast from "../DefaultToast";

type Props = ToastProviderProps;

const ToastProvider: React.FunctionComponent<Props> = ({
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
