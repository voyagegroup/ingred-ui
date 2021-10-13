import * as React from "react";
import styled from "styled-components";

export type VerticalSpacing = "small" | "medium" | "large";

const verticalSpacingMap: { [key in VerticalSpacing]: string } = {
  small: "8px",
  medium: "12px",
  large: "16px",
};

type RowProps = {
  verticalSpacing: VerticalSpacing;
};

const Component = styled.tr<RowProps>`
  border: 1px solid ${({ theme }) => theme.palette.divider};

  & > td,
  th {
    padding-top: ${({ verticalSpacing }) =>
      verticalSpacingMap[verticalSpacing]};
    padding-bottom: ${({ verticalSpacing }) =>
      verticalSpacingMap[verticalSpacing]};
  }
`;

export type Props = React.ComponentPropsWithoutRef<"tr"> & Partial<RowProps>;

export const Row = React.forwardRef<HTMLTableRowElement, Props>(
  ({ children, verticalSpacing = "medium", ...rest }, ref) => (
    <Component ref={ref} verticalSpacing={verticalSpacing} {...rest}>
      {children}
    </Component>
  ),
);
