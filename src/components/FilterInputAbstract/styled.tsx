import styled from "styled-components";
import { colors } from "../../styles";

//
// -----------------------------------------------------------------------------

export const FilterTag = styled.span`
  isolation: isolate;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  padding: 1px 4px 1px 6px;
  border: 1px solid ${colors.basic[400]};
  border-radius: 2px;
  /* UI/Text 12 */
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  word-break: break-all;
  color: ${colors.basic[900]};
  background-color: #fff;
`;

export const FilterTagButton = styled.button`
  flex-shrink: 0;
  height: 18px;
  aspect-ratio: 1;
  padding: 0;
  border: 0;
  zoom: ${16 / 18};
  color: ${colors.basic[900]};
  background-color: transparent;
  cursor: pointer;
`;

//
// -----------------------------------------------------------------------------

export const FilterInputAbstract = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 46px 1fr;
  align-items: center;
  gap: 0;
  height: 28px;
  border-radius: 4px;
  border: 1px solid ${colors.basic[400]};
  background-color: #fff;
  overflow: hidden;

  &[data-small="true"] {
    display: block;
    border: 0;
    background-color: transparent;
  }
`;

export const DropDownTrigger = styled.button`
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  display: flex;
  gap: 2px;
  align-items: center;
  height: 100%;
  padding: 0 2px 0 6px;
  border: 0;
  border-right: 1px solid ${colors.basic[400]};
  outline-offset: -1px;
  color: #000;
  background: #fff;
  cursor: pointer;

  &:where(${FilterInputAbstract.toString()}[data-small="true"] *) {
    display: none;
  }
`;
