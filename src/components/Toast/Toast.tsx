import React from "react";
import { useToasts, ToastProps } from "react-toast-notifications";
import DefaultToast from "./DefaultToast";
import ToastProvider from "./ToastProvider";

const Toast = (props: ToastProps) => <DefaultToast {...props} />;
Toast.Provider = ToastProvider;
Toast.useToasts = useToasts;

export default Toast;
