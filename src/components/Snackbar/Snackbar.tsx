import * as React from "react";
import * as Styled from "./styled";
import { SnackbarContent } from "./internal/SnackbarContent";

export type SnackbarColor = "default" | "dark" | "warning";

type Props = {
  color?: SnackbarColor;
  anchorOrigin?: {
    horizontal: "left" | "right";
    vertical: "top" | "bottom";
  };
  isOpen?: boolean;
  onClose?: () => void;
};

const Snackbar: React.FunctionComponent<Props> = ({
  color = "default",
  anchorOrigin: { vertical, horizontal } = {
    vertical: "bottom",
    horizontal: "right",
  },
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Styled.Container vertical={vertical} horizontal={horizontal}>
      <SnackbarContent color={color} onClose={onClose}>
        {children}
      </SnackbarContent>
    </Styled.Container>
  );
};

export default Snackbar;
