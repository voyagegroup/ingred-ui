import React, { Component, ComponentType } from "react";

import { NOOP } from "./utils";
import type { ToastProps } from "./ToastElement";

type Props = ToastProps & { component: ComponentType<ToastProps> };
type State = { isRunning: boolean };

const TimerType = {
  clear: NOOP,
  pause: NOOP,
  resume: NOOP,
};

class Timer {
  start: number;
  remaining: number;
  timerId: NodeJS.Timeout;
  callback: () => void;

  constructor(callback: () => void, delay: number) {
    this.callback = callback;
    this.start = delay;
    this.remaining = delay;
    this.resume();
  }

  clear() {
    clearTimeout(this.timerId);
  }

  pause() {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.callback, this.remaining);
  }
}

export class ToastController extends Component<Props, State> {
  timeout: typeof TimerType;
  state = {
    isRunning: Boolean(this.props.autoDismiss),
  };
  static defaultProps = {
    autoDismiss: false,
  };

  componentDidMount() {
    this.startTimer();
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.autoDismiss !== this.props.autoDismiss) {
      const startOrClear = this.props.autoDismiss
        ? this.startTimer
        : this.clearTimer;

      startOrClear();
    }
  }
  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const {
      autoDismiss,
      autoDismissTimeout,
      component: Toast,
      ...props
    } = this.props;
    const { isRunning } = this.state;

    // NOTE: conditions here so methods can be clean
    const handleMouseEnter = autoDismiss ? this.onMouseEnter : NOOP;
    const handleMouseLeave = autoDismiss ? this.onMouseLeave : NOOP;

    return (
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      <Toast
        autoDismiss={autoDismiss}
        autoDismissTimeout={autoDismissTimeout}
        // @ts-ignore
        isRunning={isRunning}
        // @ts-ignore
        onMouseEnter={handleMouseEnter}
        // @ts-ignore
        onMouseLeave={handleMouseLeave}
        {...props}
      />
      /* eslint-enable @typescript-eslint/ban-ts-comment */
    );
  }

  startTimer = () => {
    const { autoDismiss, autoDismissTimeout, onDismiss } = this.props;

    if (!autoDismiss) return;

    this.setState({ isRunning: true });
    this.timeout = new Timer(onDismiss, autoDismissTimeout);
  };

  clearTimer = () => {
    if (this.timeout) this.timeout.clear();
  };

  onMouseEnter = () => {
    this.setState({ isRunning: false }, () => {
      if (this.timeout) this.timeout.pause();
    });
  };
  onMouseLeave = () => {
    this.setState({ isRunning: true }, () => {
      if (this.timeout) this.timeout.resume();
    });
  };
}
