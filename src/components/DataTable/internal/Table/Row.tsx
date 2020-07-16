import * as React from "react";
import styled from "styled-components";

export type VerticalSpacing = "small" | "medium" | "large";

const verticalSpacingMap: { [key in VerticalSpacing]: string } = {
  small: "8px",
  medium: "12px",
  large: "16px",
};

type RowProps = {
  highlighted: boolean;
  verticalSpacing: VerticalSpacing;
};

const Component = styled.tr<RowProps>`
  background-color: ${({ highlighted, theme }) =>
    highlighted ? theme.palette.primary.highlight : "none"};

  &:hover {
    background-color: ${({ highlighted, theme }) =>
      highlighted ? "none" : theme.palette.gray.highlight};
  }

  & > td {
    padding-top: ${({ verticalSpacing }) =>
      verticalSpacingMap[verticalSpacing]};
    padding-bottom: ${({ verticalSpacing }) =>
      verticalSpacingMap[verticalSpacing]};
  }
`;

export type Props = React.ComponentPropsWithRef<"tr"> & Partial<RowProps>;

export const Row: React.FunctionComponent<Props> = ({
  highlighted = false,
  verticalSpacing = "medium",
  children,
  ...rest
}) => (
  <Component
    highlighted={highlighted}
    verticalSpacing={verticalSpacing}
    {...rest}
  >
    {children}
  </Component>
);
