import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

import type { Placement } from "./types";
import { gutter } from "./ToastElement";

const Div = styled.div<{ hasToasts: boolean; placement: Placement }>`
  box-sizing: border-box;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: ${gutter}px;
  pointer-events: ${({ hasToasts }) => (hasToasts ? undefined : "none")};
  position: fixed;
  z-index: 1000;
  ${({ placement }) => {
    switch (placement) {
      case "top-left":
        return css({ top: 0, left: 0 });
      case "top-center":
        return css({ top: 0, left: "50%", transform: "translateX(-50%)" });
      case "top-right":
        return css({ top: 0, right: 0 });
      case "bottom-left":
        return css({ bottom: 0, left: 0 });
      case "bottom-center":
        return css({ bottom: 0, left: "50%", transform: "translateX(-50%)" });
      case "bottom-right":
        return css({ bottom: 0, right: 0 });
    }
  }}
`;

export type ToastContainerProps = {
  children?: ReactNode;
  hasToasts: boolean;
  placement: Placement;
};

export const ToastContainer = ({
  hasToasts,
  placement,
  ...props
}: ToastContainerProps) => (
  <Div
    className="react-toast-notifications__container"
    hasToasts={hasToasts}
    placement={placement}
    {...props}
  />
);
