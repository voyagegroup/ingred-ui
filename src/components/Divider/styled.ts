import styled from "styled-components";
import { SpacerProps, spacer } from "../../utils/spacer";

type DividerProps = SpacerProps & {
  color: string;
  orientation: "vertical" | "horizontal";
};

export const Divider = styled.hr<DividerProps>`
  ${spacer}
  width: ${({ orientation }) => (orientation === "vertical" ? "1px" : "auto")};
  height: ${({ orientation }) => (orientation === "vertical" ? "auto" : "1px")};
  border: none;
  background-color: ${({ color }) => color};

  /* MEMO: adjust to FlexItem */
  align-self: stretch;
  justify-self: stretch;
`;
