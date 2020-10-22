import styled from "styled-components";
import { Space } from "../../styles";

export const Container = styled.div`
  padding-left: ${Space}px;
  border-left: 1px solid ${({ theme }) => theme.palette.divider};
`;
