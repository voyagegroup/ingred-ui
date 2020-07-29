import styled from "styled-components";
import { SpacerProps, spacer } from "../../utils/spacerUtils";

type DividerProps = SpacerProps & {
  color: string;
  orientation: "vertical" | "horizontal";
  isFlexItem: boolean;
};

export const Divider = styled.hr<DividerProps>`
  ${spacer}
  width: ${({ orientation }) => (orientation === "vertical" ? "1px" : "auto")};
  height: ${({ orientation, isFlexItem }) => {
    switch (true) {
      case isFlexItem:
        return "auto";
      case orientation === "vertical":
        return "100%";
      default:
        return "1px";
    }
  }};
  border: none;
  background-color: ${({ color }) => color};
`;
