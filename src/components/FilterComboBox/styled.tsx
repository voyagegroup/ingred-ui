import styled from "styled-components";
import { colors } from "../../styles";

export const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  width: calc(100% + 46px);
  height: 100%;
  margin-left: -46px;
`;

export const TagList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 4px;
  max-width: calc(100% - 78px);
  height: 100%;
  padding: 0 6px;
  margin-left: 46px;
  background: orange;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Select = styled.button`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: end;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 54px;
  border: 0;
  background: transparent;
  outline-offset: -1px;
  color: ${colors.basic[900]};
  cursor: pointer;

  // &:focus {
  //   isolation: isolate;
  //   z-index: 1;
  // }
`;
export const SelectIcon = styled.span`
  flex-shrink: 0;
  width: 18px;
`;
