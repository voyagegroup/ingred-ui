import * as React from "react";
import * as Styled from "./styled";
import { SnackbarContent } from "./internal/SnackbarContent";

export type SnackbarColor = "default" | "dark" | "warning";

export type SnackbarProps = {
  color?: SnackbarColor;
  /**
   * Define position of this component.
   */
  anchorOrigin?: {
    horizontal: "left" | "right";
    vertical: "top" | "bottom";
  };
  /**
   * If `false`, Snackbar doesn't rendered.
   */
  isOpen?: boolean;
  /**
   * Callback function that triggered when clicked ✖︎ Icon.
   */
  onClose?: () => void;
  children?: React.ReactNode;
};

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      color = "default",
      anchorOrigin: { vertical, horizontal } = {
        vertical: "bottom",
        horizontal: "right",
      },
      isOpen,
      onClose,
      children,
    },
    ref,
  ) => {
    if (!isOpen) {
      return null;
    }
    return (
      <Styled.Container ref={ref} vertical={vertical} horizontal={horizontal}>
        <SnackbarContent color={color} onClose={onClose}>
          {children}
        </SnackbarContent>
      </Styled.Container>
    );
  },
);

export default Snackbar;
