import * as React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";

export type ScrollAreaProps = React.ComponentPropsWithRef<"div"> & {
  height?: Property.Height;
  maxHeight?: Property.MaxHeight;
  minHeight?: Property.MinHeight;
};

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      height = "auto",
      maxHeight = "none",
      minHeight = "none",
      children,
      ...rest
    },
    ref,
  ) => (
    <Styled.Container
      height={height}
      maxHeight={maxHeight}
      minHeight={minHeight}
      {...rest}
      ref={ref}
    >
      {children}
    </Styled.Container>
  ),
);

export default ScrollArea;
