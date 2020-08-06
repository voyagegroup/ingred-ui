import styled from "styled-components";
import { Radius } from "../../styles";
import { hexToRgba } from "../../utils/hexToRgba";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: 0px 0px 16px
    ${({ theme }) => hexToRgba(theme.palette.gray.dark, 0.4)};
  border-radius: ${Radius.SMALL};
`;
