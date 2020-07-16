import styled from "styled-components";
import { Size, Radius } from "../../styles";
import { colors } from "../../styles/color";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const TableContainer = styled.div<{ fullWidth?: boolean }>`
  /* TODO: 本当は1pxだが、内部の要素がはみ出るので2pxにしている */
  /*       overflow: hiddenを足すとskickyにできない */
  border: ${({ fullWidth }) =>
    fullWidth ? "none" : `${Size.Border.Small} solid ${colors.basic[300]}`};
  border-top: ${Size.Border.Small} solid ${colors.basic[300]};
  border-radius: ${({ fullWidth }) => (fullWidth ? "none" : Radius.SMALL)};
`;
