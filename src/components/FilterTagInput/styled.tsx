import React from "react";
import styled from "styled-components";
import { BreakPoint } from "../../styles";
import { palette } from "../../themes/palette";
import { getShadow } from "../../utils/getShadow";
import {
  FilterSize,
  FilterVariant,
  getFilterVariantConfig,
} from "../FilterInputAbstract/types";
import { FilterInputAbstract } from "../FilterInputAbstract/styled";

type StyledProps = {
  $size: FilterSize;
  $variant: FilterVariant;
};

export const InlineField = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  min-height: 100%;
  padding: 0 5px;
  border-radius: 0 4px 4px 0;
  overflow: auto;
  scrollbar-width: none;
  background: ${({ $variant, theme }) => {
    const variantConfig = getFilterVariantConfig(theme);
    return variantConfig[$variant].background;
  }};

  &::-webkit-scrollbar {
    display: none;
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

export const OverflowIndicator = styled.button<{
  $size?: FilterSize;
  $variant: FilterVariant;
}>`
  position: absolute;
  inset: 0 0 0 auto;
  display: none;
  place-items: center;
  width: ${({ $size = "medium" }) => {
    switch ($size) {
      case "small":
        return "26px";
      case "medium":
        return "30px";
      case "large":
        return "38px";
    }
  }};
  border: 0;
  outline-offset: -1px;
  color: ${({ theme }) => theme.palette.black};
  background-color: ${({ $variant, theme }) => {
    const variantConfig = getFilterVariantConfig(theme);
    return variantConfig[$variant].background;
  }};
  box-shadow: -2px 0px 4px rgba(4, 28, 51, 0.16);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
    background-color: ${({ theme }) => theme.palette.gray.light};
    cursor: not-allowed;
    box-shadow: none;
  }

  &:where([data-overflowing="true"]) {
    display: grid;
  }

  &:where(${FilterInputAbstract}[data-small="true"] *) {
    position: static;
    display: grid;
    width: ${({ $size = "medium" }) => {
      switch ($size) {
        case "small":
          return "26px";
        case "medium":
          return "30px";
        case "large":
          return "38px";
      }
    }};
    aspect-ratio: 1;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    border-radius: 4px;
    box-shadow: ${getShadow(1, 0.04, palette.action.shadowBase)};

    &:disabled {
      border-color: ${({ theme }) => theme.palette.gray.main};
      background-color: ${({ theme }) => theme.palette.gray.light};
      box-shadow: none;
    }
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
  color: ${({ theme }) => theme.palette.icon.line};
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
  background: ${({ theme }) => theme.palette.background.default};
  border: 1px solid ${({ theme }) => theme.palette.gray.light};
  /* Drop shadow Common */
  box-shadow: 0px 0px 16px rgba(4, 28, 51, 0.08);
  pointer-events: auto;

  @media (max-width: ${BreakPoint.MEDIUM}px) {
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
  color: ${({ theme }) => theme.palette.black};
  background: ${({ theme }) => theme.palette.basicDark.ultraLight};
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
  color: ${({ theme }) => theme.palette.black};
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
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 6px;
  /* UI/Text 13 */
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  color: ${({ theme }) => theme.palette.black};
  background: ${({ theme }) => theme.palette.basicDark.ultraLight};
  cursor: pointer;
  transition: all 0.2s ease;
  
  @media (max-width: ${BreakPoint.MEDIUM}px) {
    width: fit-content;
  }

  &:hover {
    outline: none;
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.palette.primary.light}66`};
  }
`;

export const PanelSelectTriggerSpacer = styled.div`
  grid-area: spacer;
  display: flex;
  gap: 2px;
  align-items: center;
  visibility: hidden;
  /* UI/Text 13 */
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
`;

export const PanelSelectTriggerLabel = styled.div`
  grid-area: label;
  display: flex;
  gap: 2px;
  align-items: center;
  /* UI/Text 13 */
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  color: ${({ theme }) => theme.palette.black};
`;

export const PanelSelectTriggerIcon = styled.div`
  grid-area: downArrow;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PanelTagField = styled.div`
  position: relative;
  display: flex;
  gap: 6px;
  align-items: flex-start;
  flex-wrap: wrap;
  box-sizing: border-box;
  min-height: 34px;
  padding: 6px 37px 6px 6px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 6px;
  background: ${({ theme }) => theme.palette.basicDark.ultraLight};
  cursor: text;

  &:focus-within {
    border-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.palette.primary.light}66`};
  }
`;

export const PanelTagFieldFocusTrigger = styled.button`
  position: absolute;
  inset: 0;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: text;
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
  color: ${({ theme }) => theme.palette.black};
  background: transparent;
  cursor: pointer;
`;

export const PanelButtons = styled.ul`
  grid-area: bottom;
  display: flex;
  gap: 8px;
  justify-content: end;
  padding: 16px 0 0;
  border-top: 1px solid ${({ theme }) => theme.palette.gray.light};
  list-style: none;
`;
