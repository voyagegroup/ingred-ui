import styled from "styled-components";
import { SpacerProps, spacer } from "../../utils/spacerUtils";

type DividerProps = SpacerProps & {
  color: string;
};

export const Divider = styled.hr<DividerProps>`
  ${spacer}
  height: 1px;
  border: none;
  background-color: ${({ color }) => color};
`;
