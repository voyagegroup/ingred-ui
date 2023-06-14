import styled from "styled-components";
import { getShadow } from "../../utils/getShadow";

export const Tooltip = styled.div<{ width?: string }>`
  display: flex;
  align-items: center;
  align-content: center;
  width: ${({ width }) => width || "auto"};
  padding: ${({ theme }) => `${theme.spacing * 0.75}px ${theme.spacing}px`};
  border-radius: ${({ theme }) => theme.radius}px;
  color: ${({ theme }) => theme.palette.white};
  background-color: ${({ theme }) => theme.palette.black};
  font-weight: bold;
  font-size: 12px;
  box-shadow: ${({ theme }) =>
    getShadow(
      5,
      theme.palette.action.shadowOpacity,
      theme.palette.action.shadowBase,
    )};
  z-index: ${({ theme }) => theme.depth.tooltip};
`;
