import styled from "styled-components";
import { colors } from "../../styles";

export const SelectContainer = styled.div`
  min-width: 0;
  width: calc(100% + 46px);
  height: 100%;
  margin-left: -46px;
`;

export const Select = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 54px;
  border: 0;
  background: transparent;
  outline-offset: -1px;
  font-size: 13px;
  text-align: left;
  color: ${colors.basic[900]};
  cursor: pointer;

  &:focus {
    isolation: isolate;
    z-index: 1;
  }
`;

export const SelectLabel = styled.span`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SelectIcon = styled.span`
  flex-shrink: 0;
  width: 18px;
`;
