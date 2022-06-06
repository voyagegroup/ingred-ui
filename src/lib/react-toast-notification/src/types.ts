import { ReactNode } from "react";

export type AppearanceTypes = "error" | "info" | "success" | "warning";
export type Id = string;
export type Callback = (id: Id) => void;
export type Options = {
  appearance?: AppearanceTypes;
  autoDismiss?: boolean;
  id?: string;
  onDismiss?: (id: string) => void;
  [key: string]: any;
};

export type AddFn = (
  content: ReactNode,
  options?: Options,
  callback?: (id: string) => void,
) => void;
export type UpdateFn = (id: Id, options: Options) => void;
export type RemoveFn = (id: Id) => void;

export type HoverFn = () => void;

export type Placement =
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "top-left"
  | "top-center"
  | "top-right";

export type ToastType = Options & {
  appearance: AppearanceTypes;
  content: Node;
  id: Id;
};
export type ToastsType = Array<ToastType>;
