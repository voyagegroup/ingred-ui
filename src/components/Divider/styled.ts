import styled from "styled-components";
import { SpacerProps, spacer } from "../Spacer/Spacer";

type DividerProps = SpacerProps & {
  color: string;
};

export const Divider = styled.hr<DividerProps>`
  /* TODO: style.tsに書かれているものもutils/に移動せずに利用して良いのか相談 */
  ${spacer}
  height: 1px;
  border: none;
  background-color: ${({ color }) => color};
`;
