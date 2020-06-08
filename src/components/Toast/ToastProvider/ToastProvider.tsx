import * as React from "react";
import {
  ToastProvider as DefaultToastProvider,
  ToastProviderProps,
} from "react-toast-notifications";
import ToastContainer from "./internal/ToastContainer";
import DefaultToast from "../DefaultToast";
import { deepmerge } from "../../../utils/deepmerge";

type Props = ToastProviderProps;

const ToastProvider: React.FunctionComponent<Props> = ({
  children,
  components: componentProps = {},
  ...rest
}) => {
  const components = deepmerge(
    { Toast: DefaultToast, ToastContainer },
    componentProps,
  );
  return (
    <DefaultToastProvider components={components} {...rest}>
      {children}
    </DefaultToastProvider>
  );
};

export default ToastProvider;
