import * as React from "react";
import { ToastContainerProps } from "../../../../../lib/react-toast-notification/src";
import Spacer from "../../../../Spacer";
import * as Styled from "./styled";

const ToastContainer: React.FunctionComponent<ToastContainerProps> = ({
  children,
  ...rest
}) => {
  const spacerProps = {
    pt: rest.placement.includes("top") ? 3 : 0,
    pb: rest.placement.includes("bottom") ? 3 : 0,
  };

  return (
    <Styled.ToastContainer {...rest}>
      <Spacer {...spacerProps}>{children}</Spacer>
    </Styled.ToastContainer>
  );
};

export default ToastContainer;
