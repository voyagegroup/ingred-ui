import React, { useEffect, useRef, useState, FC, ReactNode } from "react";
import * as Styled from "./styled";

import { CheckIcon, FlameIcon, InfoIcon, CloseIcon, AlertIcon } from "./icons";
import colors from "./colors";
import type { HoverFn, Placement } from "./types";
import { NOOP } from "./utils";
import { TransitionStatus } from "react-transition-group";

// common
export const borderRadius = 4;
export const gutter = 8;
export const toastWidth = 360;

// a11y helper
const A11yText: FC<{
  className: string;
  tag?: keyof JSX.IntrinsicElements;
}> = ({ tag = "span", ...props }: any) => <Styled.Tag as={tag} {...props} />;

// default appearances

const appearances = {
  success: {
    icon: CheckIcon,
    text: colors.G500,
    fg: colors.G300,
    bg: colors.G50,
  },
  error: {
    icon: FlameIcon,
    text: colors.R500,
    fg: colors.R300,
    bg: colors.R50,
  },
  warning: {
    icon: AlertIcon,
    text: colors.Y500,
    fg: colors.Y300,
    bg: colors.Y50,
  },
  info: {
    icon: InfoIcon,
    text: colors.N400,
    fg: colors.B200,
    bg: "white",
  },
};
export type AppearanceTypes = keyof typeof appearances;

const Button: FC<{ onClick: () => void }> = ({ children, ...rest }) => (
  <Styled.Button
    role="button"
    className="react-toast-notifications__toast__dismiss-button"
    gutter={gutter}
    {...rest}
  >
    {children}
  </Styled.Button>
);

const Content: FC = (props) => (
  <Styled.Content
    className="react-toast-notifications__toast__content"
    gutter={gutter}
    {...props}
  />
);

// NOTE: invoke animation when NOT `autoDismiss` with opacity of 0 to avoid a
// paint bug in FireFox.
// https://bugzilla.mozilla.org/show_bug.cgi?id=625289
const Countdown = ({
  autoDismissTimeout,
  opacity,
  isRunning,
  ...props
}: any) => (
  <Styled.Countdown
    className="react-toast-notifications__toast__countdown"
    autoDismissTimeout={autoDismissTimeout}
    isRunning={isRunning}
    opacity={opacity}
    {...props}
  />
);

const Icon = ({
  appearance,
  autoDismiss,
  autoDismissTimeout,
  isRunning,
}: any) => {
  const meta = appearances[appearance];
  const Glyph = meta.icon;

  return (
    <Styled.Icon
      className="react-toast-notifications__toast__icon-wrapper"
      color={meta.bg}
      backgroundColor={meta.fg}
      borderRadius={borderRadius}
      gutter={gutter}
    >
      <Countdown
        opacity={autoDismiss ? 1 : 0}
        autoDismissTimeout={autoDismissTimeout}
        isRunning={isRunning}
      />
      <Glyph
        className="react-toast-notifications__toast__icon"
        css={{ position: "relative", zIndex: 1 }}
      />
    </Styled.Icon>
  );
};

const ToastElement = ({
  appearance,
  placement,
  transitionDuration,
  transitionState,
  ...props
}: any) => {
  const [height, setHeight] = useState<string | number>("auto");
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;
    if (transitionState === "entered") {
      const el = elementRef.current;
      setHeight(el.offsetHeight + gutter);
    }
    if (transitionState === "exiting") {
      setHeight(0);
    }
  }, [transitionState]);

  return (
    <Styled.ToastElement
      ref={elementRef}
      height={height}
      transitionDuration={transitionDuration}
    >
      <Styled.ToastElementInner
        className={`react-toast-notifications__toast react-toast-notifications__toast--${appearance}`}
        backgroundColor={appearances[appearance].bg}
        borderRadius={borderRadius}
        color={appearances[appearance].text}
        gutter={gutter}
        placement={placement}
        width={toastWidth}
        transitionState={transitionState}
        transitionDuration={transitionDuration}
        {...props}
      />
    </Styled.ToastElement>
  );
};

// ==============================
// DefaultToast
// ==============================

export type ToastProps = {
  appearance: AppearanceTypes;
  autoDismiss: boolean; // may be inherited from ToastProvider
  autoDismissTimeout: number; // inherited from ToastProvider
  children: ReactNode;
  isRunning: boolean;
  onDismiss: typeof NOOP;
  onMouseEnter: HoverFn;
  onMouseLeave: HoverFn;
  placement: Placement;
  transitionDuration: number; // inherited from ToastProvider
  transitionState: TransitionStatus; // inherited from ToastProvider
};

export const DefaultToast = ({
  appearance = "info",
  autoDismiss,
  autoDismissTimeout,
  children,
  isRunning,
  onDismiss,
  placement,
  transitionDuration,
  transitionState,
  onMouseEnter,
  onMouseLeave,
  ...otherProps
}: ToastProps) => (
  <ToastElement
    appearance={appearance}
    placement={placement}
    transitionState={transitionState}
    transitionDuration={transitionDuration}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    {...otherProps}
  >
    <Icon
      appearance={appearance}
      autoDismiss={autoDismiss}
      autoDismissTimeout={autoDismissTimeout}
      isRunning={isRunning}
    />
    <Content>{children}</Content>
    {onDismiss ? (
      <Button onClick={onDismiss}>
        <CloseIcon className="react-toast-notifications__toast__dismiss-icon" />
        <A11yText className="react-toast-notifications__toast__dismiss-text">
          Close
        </A11yText>
      </Button>
    ) : null}
  </ToastElement>
);

DefaultToast.defaultProps = {
  onDismiss: NOOP,
};
