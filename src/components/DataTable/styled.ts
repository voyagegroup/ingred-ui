import styled from "styled-components";
import { Size, Radius } from "../../styles";
import { colors } from "../../styles/color";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  th {
    white-space: nowrap;
  }
`;

export const TableContainer = styled.div`
  border: ${Size.Border.Small} solid ${colors.basic[300]};
  border-radius: ${Radius.SMALL};
  overflow: hidden;
`;
