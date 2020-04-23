import styled from "styled-components";
import { Radius, Space } from "../../styles";

export const Container = styled.button`
  display: flex;
  align-items: center;
  padding: ${Space * 0.75}px ${Space}px;
  border: 0;
  cursor: pointer;
  border-radius: ${Radius.SMALL};
  background-color: ${({ theme }) => theme.palette.background.hint};
  white-space: nowrap;
  transition: all 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.palette.background.active};
  }
`;
