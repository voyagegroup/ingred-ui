import React, {
  Component,
  useContext,
  ComponentType,
  Ref,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Transition, TransitionGroup } from "react-transition-group";

import { ToastController } from "./ToastController";
import { ToastContainer, ToastContainerProps } from "./ToastContainer";
import { ToastProps, DefaultToast } from "./ToastElement";
const defaultComponents = { Toast: DefaultToast, ToastContainer };

import { generateUEID, NOOP } from "./utils";
import type {
  AddFn,
  UpdateFn,
  RemoveFn,
  Callback,
  ToastsType,
  Options,
  Placement,
  Id,
  ToastType,
} from "./types";

const ToastContext = React.createContext<Context>({
  add: () => "0", // MEMO: This is a dummy value.
  remove: NOOP,
  removeAll: NOOP,
  update: NOOP,
  toasts: [],
});
const { Consumer, Provider } = ToastContext;

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

// Provider
// ==============================

type Components = {
  Toast: ComponentType<ToastProps>;
  ToastContainer: ComponentType<ToastContainerProps>;
};
export type ToastProviderProps = {
  // A convenience prop; the time until a toast will be dismissed automatically, in milliseconds.
  // Note that specifying this will override any defaults set on individual children Toasts.
  autoDismissTimeout?: number;
  // Whether or not to dismiss the toast automatically after `autoDismissTimeout`.
  autoDismiss?: boolean;
  // Component replacement object
  components?: Components;
  // When true, insert new toasts at the top of the stack
  newestOnTop?: boolean;
  // Where, in relation to the viewport, to place the toasts
  placement: Placement;
  // Which element to attach the container's portal to, defaults to the `body`.
  portalTargetSelector?: string;
  // A convenience prop; the duration of the toast transition, in milliseconds.
  // Note that specifying this will override any defaults set on individual children Toasts.
  transitionDuration?: number;
};
type State = { toasts: ToastsType };
type Context = {
  add: AddFn;
  remove: RemoveFn;
  removeAll: () => void;
  update: UpdateFn;
  toasts: Array<ToastType>;
};

export class ToastProvider extends Component<ToastProviderProps, State> {
  nodeRef: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    autoDismiss: false,
    autoDismissTimeout: 5000,
    components: defaultComponents,
    newestOnTop: false,
    placement: "top-right",
    transitionDuration: 220,
    nodeRef: null,
  };

  constructor(props: ToastProviderProps | Readonly<ToastProviderProps>) {
    super(props);
    this.nodeRef = React.createRef();
  }

  state = { toasts: [] as State["toasts"] };

  render() {
    const {
      autoDismiss: inheritedAutoDismiss,
      autoDismissTimeout,
      children,
      components,
      placement,
      portalTargetSelector,
      transitionDuration,
    } = this.props;
    const { Toast, ToastContainer } = { ...defaultComponents, ...components };
    const { add, remove, removeAll, update } = this;
    const toasts = this.state.toasts;

    const hasToasts = Boolean(toasts.length);
    // eslint-disable-next-line no-nested-ternary
    const portalTarget = canUseDOM
      ? portalTargetSelector
        ? document.querySelector(portalTargetSelector)
        : document.body
      : null; // appease flow

    return (
      <Provider value={{ add, remove, removeAll, update, toasts }}>
        {children}

        {portalTarget ? (
          createPortal(
            <ToastContainer placement={placement} hasToasts={hasToasts}>
              <TransitionGroup component={null}>
                {toasts.map(
                  ({
                    appearance,
                    autoDismiss,
                    content,
                    id,
                    onDismiss,
                    ...unknownConsumerProps
                  }) => (
                    <Transition
                      key={id}
                      appear
                      mountOnEnter
                      unmountOnExit
                      nodeRef={this.nodeRef}
                      timeout={transitionDuration as number}
                    >
                      {(transitionState) => (
                        <ToastController
                          key={id}
                          appearance={appearance}
                          autoDismiss={
                            autoDismiss !== undefined
                              ? autoDismiss
                              : inheritedAutoDismiss
                          }
                          autoDismissTimeout={autoDismissTimeout}
                          component={Toast}
                          placement={placement}
                          transitionDuration={transitionDuration}
                          transitionState={transitionState}
                          onDismiss={this.onDismiss(id, onDismiss)}
                          {...(unknownConsumerProps as any)}
                        >
                          {content}
                        </ToastController>
                      )}
                    </Transition>
                  ),
                )}
              </TransitionGroup>
            </ToastContainer>,
            portalTarget,
          )
        ) : (
          <ToastContainer placement={placement} hasToasts={hasToasts} /> // keep ReactDOM.hydrate happy
        )}
      </Provider>
    );
  }

  // Internal Helpers
  // ------------------------------

  has = (id: string) => {
    if (!this.state.toasts.length) {
      return false;
    }

    return Boolean(this.state.toasts.filter((t) => t.id === id).length);
  };
  onDismiss =
    (id: Id, cb: Callback = NOOP) =>
    () => {
      cb(id);
      this.remove(id);
    };

  // Public API
  // ------------------------------

  add = (content: Node, options?: Options, cb: Callback = NOOP) => {
    const id = options?.id ? options.id : generateUEID();
    const callback = () => cb(id);

    // bail if a toast exists with this ID
    if (this.has(id)) {
      return;
    }

    // update the toast stack
    this.setState((state) => {
      const newToast = { content, id, ...options } as ToastType;
      const toasts = this.props.newestOnTop
        ? [newToast, ...state.toasts]
        : [...state.toasts, newToast];

      return { toasts };
    }, callback);

    // consumer may want to do something with the generated ID (and not use the callback)
    return id;
  };
  remove = (id: Id, cb: Callback = NOOP) => {
    const callback = () => cb(id);

    // bail if NO toasts exists with this ID
    if (!this.has(id)) {
      return;
    }

    this.setState((state) => {
      const toasts = state.toasts.filter((t) => t.id !== id);
      return { toasts };
    }, callback);
  };
  removeAll = () => {
    if (!this.state.toasts.length) {
      return;
    }

    this.state.toasts.forEach((t) => this.remove(t.id));
  };
  update = (id: Id, options?: Options, cb: Callback = NOOP) => {
    const callback = () => cb(id);

    // bail if NO toasts exists with this ID
    if (!this.has(id)) {
      return;
    }

    // update the toast stack
    this.setState((state) => {
      const old = state.toasts;
      const i = old.findIndex((t) => t.id === id);
      const updatedToast = { ...old[i], ...options };
      const toasts = [...old.slice(0, i), updatedToast, ...old.slice(i + 1)];

      return { toasts };
    }, callback);
  };
}

export const ToastConsumer = ({
  children,
}: {
  children: (Context: any) => ReactNode;
}) => <Consumer>{(context) => children(context)}</Consumer>;

export const withToastManager = (Comp: ComponentType<any>) =>
  React.forwardRef((props: any, ref: Ref<any>) => (
    <ToastConsumer>
      {(context) => <Comp toastManager={context} {...props} ref={ref} />}
    </ToastConsumer>
  ));

export const useToasts = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw Error(
      "The `useToasts` hook must be called from a descendent of the `ToastProvider`.",
    );
  }

  return {
    addToast: ctx.add,
    removeToast: ctx.remove,
    removeAllToasts: ctx.removeAll,
    updateToast: ctx.update,
    toastStack: ctx.toasts,
  };
};
