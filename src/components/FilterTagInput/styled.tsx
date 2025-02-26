import styled from "styled-components";
import React from "react";
import { BreakPoint, colors } from "../../styles";
import { palette } from "../../themes/palette";
import { getShadow } from "../../utils/getShadow";

import { FilterInputAbstract } from "../FilterInputAbstract/styled";

export const InlineField = styled.div`
  display: flex;
  align-items: center;
  min-height: 100%;
  padding: 0 5px;
  border-radius: 0 4px 4px 0;
  overflow: auto;
  scrollbar-width: none;
  background: ${colors.basic[100]};

  &::-webkit-scrollbar {
    display: none;
  }

  &:has(input:focus) {
    outline: auto;
    outline-offset: -1px;
    outline: auto -webkit-focus-ring-color;
  }

  &:where(${FilterInputAbstract}[data-small="true"] *) {
    display: none;
  }
`;

export const InlineFieldInner = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 5px;
  white-space: nowrap;
`;

export const OverflowIndicator = styled.button`
  position: absolute;
  inset: 0 0 0 auto;
  display: none;
  place-items: center;
  width: 30px;
  border: 0;
  outline-offset: -1px;
  color: #000;
  background-color: #fff;
  box-shadow: -2px 0px 2px rgba(4, 28, 51, 0.16);
  cursor: pointer;

  &:where([data-overflowing="true"]) {
    display: grid;
  }

  &:where(${FilterInputAbstract}[data-small="true"] *) {
    position: static;
    display: grid;
    width: 28px;
    aspect-ratio: 1;
    border: 1px solid ${colors.basic[400]};
    border-radius: 4px;
    box-shadow: ${getShadow(1, 0.04, palette.action.shadowBase)};
  }

  &:where(${FilterInputAbstract}[data-small="true"] *:active:not(:disabled)) {
    padding-top: 4px;
    background: ${palette.gray.highlight};
    box-shadow: ${getShadow(2, 0.04, palette.black)};
  }

  &::before {
    content: "";
    position: absolute;
    display: block;
    inset: 0 100% 0 auto;
    width: 20px;
    background-color: transparent;
  }
`;

export const InlineInput = styled.div`
  position: relative;
  flex-grow: 1;
  min-width: 100px;

  input {
    box-sizing: border-box;
    width: 100%;
    border: 0;
    padding: 0;
    background: transparent;
    outline: none;

    &:focus {
      isolation: isolate;
      z-index: 1;
    }
  }
`;

export const InlineInputIcon = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  display: grid;
  place-items: center;
  width: 20px;
  color: ${colors.basic[600]};
  pointer-events: none;
`;
//
// -----------------------------------------------------------------------------

const PanelInner = styled.div`
  display: grid;
  grid-template:
    "title title"
    "left right"
    "bottom bottom" /
    auto 1fr;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 800px;
  padding: 16px;
  border-radius: 6px;
  background: #FFFFFF;};
  border: 1px solid ${colors.basic[200]};
  /* Drop shadow Common */
  box-shadow: 0px 0px 16px rgba(4, 28, 51, 0.08);
  pointer-events: auto;

  @media ( max-width: ${BreakPoint.MEDIUM}px ) {
    grid-template:
      "title"
      "left"
      "right"
      "bottom";
      gap: 16px;
  }
`;

export const Panel = styled(({ className, children }) => {
  return (
    <div className={className}>
      <PanelInner>{children}</PanelInner>
    </div>
  );
})`
  position: absolute;
  inset: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const PanelTitle = styled.div`
  grid-area: title;
  padding: 8px 16px;
  margin: 0 -16px;
  /* UI/Text 16 bold */
  font-weight: 700;
  font-size: 16px;
  color: ${colors.basic[900]};
  background: ${colors.basic[100]};
`;

export const PanelLeft = styled.div`
  grid-area: left;
  min-width: 0;
`;

export const PanelRight = styled.div`
  grid-area: right;
  min-width: 0;
`;

export const PanelLabel = styled.p`
  margin: 0 0 4px;
  /* UI/Text 13 bold */
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: ${colors.basic[900]};
`;

export const PanelSelectTrigger = styled.button`
  display: grid;
  grid-template:
    "spacer spacer" 0
    "label downArrow" /
    1fr 18px;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 34px;
  padding: 4px 8px;
  border: 1px solid ${colors.basic[400]};
  border-radius: 6px;
  /* UI/Text 13 */
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  color: ${colors.basic[900]};
  background: ${colors.basic[100]};

  @media (max-width: ${BreakPoint.MEDIUM}px) {
    width: fit-content;
  }
`;

export const PanelSelectTriggerSpacer = styled.span`
  grid-area: spacer;
  display: flex;
  gap: 4px;
  white-space: nowrap;
  height: 0;
  padding-right: 22px;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
`;

export const PanelSelectTriggerLabel = styled.span`
  grid-area: label;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PanelSelectTriggerIcon = styled.span`
  grid-area: downArrow;
  flex-shrink: 0;
  width: 18px;
  color: ${colors.basic[900]};
`;

export const PanelButtons = styled.ul`
  grid-area: bottom;
  display: flex;
  gap: 8px;
  justify-content: end;
  padding: 16px 0 0;
  border-top: 1px solid ${colors.basic[200]};
  list-style: none;
`;

export const PanelTagField = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  box-sizing: border-box;
  padding: 6px 37px 6px 6px;
  border: 1px solid ${colors.basic[400]};
  border-radius: 6px;
  background: ${colors.basic[100]};

  &:has(input:focus) {
    outline: auto;
    outline: auto -webkit-focus-ring-color;
  }
`; // ↑ outline が 2 だけれど、前者は Firefox 用に必要

export const PanelTagFieldFocusTrigger = styled.button`
  position: absolute;
  inset: 0;
  border: 0;
  background: transparent;
`;

export const PanelInput = styled.div`
  isolation: isolate;
  display: grid;
  grid-template-columns: 0px min-content;
  min-width: 28px;
  max-width: 100%;
  overflow: hidden;

  input {
    width: 100%;
    grid-area: 1 / 2;
    min-width: 28px;
    padding: 0;
    border: 0;
    font: inherit;
    outline: none;
    background: transparent;
  }
`;
export const PanelInputSpacer = styled.div`
  visibility: hidden;
  white-space: pre;
  grid-area: 1 / 2;
  font: inherit;
`;
export const PanelClearButton = styled.button`
  position: absolute;
  inset: 0 8px 0 auto;
  display: grid;
  width: 20px;
  height: 18px;
  border: 0;
  margin: auto 0;
  color: ${colors.basic[900]};
  background: transparent;
  cursor: pointer;
`;

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
