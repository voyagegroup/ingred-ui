import * as React from "react";
import styled, { css } from "styled-components";

export type VerticalSpacing = "small" | "medium" | "large";

const verticalSpacingMap: { [key in VerticalSpacing]: string } = {
  small: "8px",
  medium: "12px",
  large: "16px",
};

type RowProps = {
  highlighted: boolean;
  verticalSpacing: VerticalSpacing;
  isStickyHeader: boolean;
  disableHoverHighlight: boolean;
};

const Component = styled.tr<RowProps>`
  background-color: ${({ highlighted, theme }) =>
    highlighted ? theme.palette.primary.highlight : "none"};

  &:hover {
    ${({ disableHoverHighlight, highlighted, theme }) =>
      disableHoverHighlight
        ? ""
        : css`
            background-color: ${highlighted
              ? "none"
              : theme.palette.gray.highlight};
          `}
  }

  & > th {
    ${({ isStickyHeader }) =>
      isStickyHeader
        ? css`
            position: sticky;
            top: 0;
            z-index: 1;
          `
        : ""}
  }

  & > td {
    padding-top: ${({ verticalSpacing }) =>
      verticalSpacingMap[verticalSpacing]};
    padding-bottom: ${({ verticalSpacing }) =>
      verticalSpacingMap[verticalSpacing]};
  }
`;

export type Props = React.ComponentPropsWithoutRef<"tr"> & Partial<RowProps>;

export const Row: React.FunctionComponent<Props> = ({
  highlighted = false,
  verticalSpacing = "medium",
  isStickyHeader = false,
  disableHoverHighlight = false,
  children,
  ...rest
}) => (
  <Component
    highlighted={highlighted}
    verticalSpacing={verticalSpacing}
    isStickyHeader={isStickyHeader}
    disableHoverHighlight={disableHoverHighlight}
    {...rest}
  >
    {children}
  </Component>
);
