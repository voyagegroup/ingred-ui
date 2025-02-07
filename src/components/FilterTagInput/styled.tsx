import styled from "styled-components";
import React from "react";
import { colors } from "../../styles";
import { palette } from "../../themes/palette";
import { getShadow } from "../../utils/getShadow";

export const FilterTagInput = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  gap: 0;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${colors.basic[400]};
  background-color: #fff;

  &[data-small="true"] {
    display: block;
    border: 0;
    background-color: transparent;
  }
`;

export const DropDownTrigger = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 2px 0 8px;
  border: 0;
  border-right: 1px solid ${colors.basic[400]};
  border-radius: 6px 0 0 6px;
  background: transparent;
  cursor: pointer;
  box-shadow:
    0px 1px 0px rgba(4, 28, 51, 0.04),
    inset 0px -3px 0px rgba(4, 28, 51, 0.06);

  &::after {
    content: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2218%22 height=%2218%22 viewBox=%220 0 18 18%22%3E%3Cpath fill=%22%23041C33%22 d=%22M9 11.3 5.8 8l1-1L9 9l2.1-2 1 1L9 11.3Z%22/%3E%3C/svg%3E");
    aspect-ratio: 1;
    height: 18px;
  }

  &:where(${FilterTagInput.toString()}[data-small="true"] *) {
    display: none;
  }
`;

export const InlineField = styled.div`
  display: flex;
  align-items: center;
  min-height: 100%;
  padding: 0 5px;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:has(input:focus) {
    outline: auto;
    outline: auto -webkit-focus-ring-color;
  }

  &:where(${FilterTagInput.toString()}[data-small="true"] *) {
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
  border-radius: 0px 5px 5px 0px;
  background-color: ${colors.basic[100]};
  box-shadow: -2px 0px 2px rgba(4, 28, 51, 0.16);
  cursor: pointer;

  &:where(${FilterTagInput.toString()}[data-overflowing="true"] *) {
    display: grid;
  }

  &:where(${FilterTagInput.toString()}[data-small="true"] *) {
    position: static;
    display: grid;
    width: 32px;
    aspect-ratio: 1;
    border: 1px solid ${colors.basic[400]};
    border-radius: 6px;
    box-shadow: ${getShadow(1, 0.04, palette.action.shadowBase)};
  }

  &:where(${FilterTagInput.toString()}[data-small="true"] *:active:not(:disabled)) {
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
    background: #fff;
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
  pointer-events: none;
`;
//
// -----------------------------------------------------------------------------

const PanelInner = styled.div`
  display: grid;
  grid-template:
    "left right"
    "bottom bottom" /
    124px 1fr;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 647px;
  padding: 16px;
  border-radius: 6px;
  background: #FFFFFF;};
  border: 1px solid ${colors.basic[200]};
  /* Drop shadow Common */
  box-shadow: 0px 0px 16px rgba(4, 28, 51, 0.08);
  pointer-events: auto;
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
  display: flex;
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
  color: ${colors.basic[700]};
  background: ${colors.basic[100]};
`;

export const PanelSelectTriggerLabel = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PanelSelectTriggerIcon = styled.span`
  flex-shrink: 0;
  width: 18px;
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
  --tag-bg-color: #fff;
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
  min-width: 32px;
  max-width: 100%;
  overflow: hidden;

  input {
    width: 100%;
    grid-area: 1 / 2;
    min-width: 32px;
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
  padding: 2px 4px 2px 6px;
  border: 1px solid ${colors.basic[400]};
  border-radius: 4px;
  /* UI/Text 12 */
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  word-break: break-all;
  color: ${colors.basic[900]};
  background-color: var(--tag-bg-color, ${colors.basic[100]});
`;

export const FilterTagButton = styled.button`
  flex-shrink: 0;
  height: 18px;
  aspect-ratio: 1;
  padding: 0;
  border: 0;
  zoom: ${16 / 18};
  background-color: transparent;
  cursor: pointer;
`;
