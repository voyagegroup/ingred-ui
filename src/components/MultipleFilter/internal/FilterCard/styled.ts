import styled from "styled-components";
import { getShadow } from "../../../../utils/getShadow";

import Card from "../../../Card";

export const FilterCard = styled(Card)<{ width?: string }>`
  box-shadow: ${({ theme }) =>
    getShadow(
      5,
      theme.palette.action.shadowOpacity,
      theme.palette.action.shadowBase,
    )};
  min-width: 300px;
  width: ${({ width }) => width};
  border-radius: ${({ theme }) => `${theme.radius}px`};
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const FilterCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.main};
`;
export const CloseIconContainer = styled.div`
  cursor: pointer;
`;

export const FilterContent = styled.div`
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px;
`;

export const ButtonContainer = styled.div`
  text-align: right;
`;
