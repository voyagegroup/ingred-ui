import styled from "styled-components";
import { colors } from "../../styles";
import { palette } from "../../themes/palette";
import { getShadow } from "../../utils/getShadow";
import { DualListBox2Accordion } from "./DualListBox2Accordion";

const actionButton = `
  display: flex;
  gap: 4px;
  box-sizing: border-box;
  padding: 6px;
  border: 1px solid ${colors.basic[400]};
  border-radius: 4px;
  background: #ffffff;
  /* UI/Text 12 */
  font-size: 12px;
  color: ${colors.basic[900]};
  cursor: pointer;
  box-shadow: ${getShadow(1, 0.04, palette.action.shadowBase)};

  &:where(:disabled) {
    color: ${colors.basic[400]};
    background: ${colors.basic[200]};
    box-shadow: ${getShadow(1, 0.04, palette.black)};
    cursor: not-allowed;
  }

  &:where(li:not(:first-child) button) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:where(li:not(:last-child) button) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:where(:hover:not(:disabled)) {
    background: ${colors.basic[100]};
  }

  &:where(:active:not(:disabled)) {
    padding-block: 8px 4px;
    background: ${palette.gray.highlight};
    box-shadow: ${getShadow(2, 0.04, palette.black)};
  }
`;

// コンテナクエリを使いたいけれど、styled-components v6 でないと使えない
// ひとまず media query を使うけれど、将来置き換えたい
export const DualListBox2 = styled.div`
  container-type: inline-size;
`;

export const TabList = styled.ul`
  display: none;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 640px) {
    display: flex;
  }

  button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px 10px;
    border: 0;
    border-bottom: 2px solid transparent;
    color: ${colors.basic[900]};
    background: transparent;

    &[aria-expanded="true"] {
      color: ${colors.blue[500]};
      border-bottom-color: ${colors.blue[500]};
    }
  }
`;

export const CountBadge = styled.span`
  display: grid;
  place-items: center;
  min-width: 16px;
  height: 16px;
  /* UI/Text 10 bold */
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  border-radius: 999%;
  color: #ffffff;
  background: ${colors.blue[500]};
`;

export const Inner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  box-sizing: border-box;
  max-width: 1009px;
  height: 576px;
  border-radius: 6px;
  border: 1px solid ${colors.basic[400]};
  background: #ffffff;

  @media (max-width: 640px) {
    display: block;
    height: auto;
    border: 0;
    border-radius: 0;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 50%;
    width: 1px;
    height: 100%;
    background: ${colors.basic[400]};

    @media (max-width: 640px) {
      content: none;
    }
  }
`;

export const LeftPanel = styled.div<{ isShow: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;

  @media (max-width: 640px) {
    display: ${({ isShow }) => (isShow ? "block" : "none")};
    height: auto;
  }
`;

export const LeftPanelBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const LeftPanelHeader = styled.div`
  display: grid;
  grid-template:
    "search search search search menu"
    "count buttons . load load" /
    auto auto 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid ${colors.basic[400]};
  background: ${colors.basic[100]};
  border-radius: 6px 0 0 0;

  @media (max-width: 640px) {
    border-radius: 0;
  }
`;

export const HeaderSearch = styled.div`
  grid-area: search;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 28px;
  padding: 0 6px;
  background: #ffffff;
  border: 1px solid ${colors.basic[400]};
  border-radius: 4px;

  &:has(input:disabled) {
    background: ${colors.basic[200]};
  }

  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0 6px 0 24px;
    border: 0;
    background: transparent;
    line-height: 28px;
    font-size: 12px;

    &::placeholder {
      color: ${colors.basic[400]};
    }
  }
`;

export const HeaderSearchReset = styled.button`
  position: absolute;
  right: 6px;
  flex-shrink: 0;
  width: 16px;
  aspect-ratio: 1;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: ${colors.basic[900]}
    url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22%3E%3Cpath fill=%22%23fff%22 d=%22M8 7 5.9 4.7l-1 1 2 2.2-2 2.1 1 1L8 9l2.1 2 1-1-2-2.1 2-2.1-1-1z%22/%3E%3C/svg%3E")
    no-repeat 50% 50%;
  cursor: pointer;
`;

export const HeaderMenuButton = styled.button`
  ${actionButton}
  grid-area: menu;
  display: grid;
  place-items: center;
  width: 28px;
  aspect-ratio: 1;
  padding: 2px 4px;
  background: #fff;
  cursor: pointer;

  &:where(:active:not(:disabled)) {
    padding-block: 2px 0;
  }
`;

export const HeaderCount = styled.div`
  grid-area: count;
  /* UI/Text 13 */
  font-size: 13px;
  line-height: 16px;
  display: flex;
  color: ${colors.basic[900]};
`;

export const HeaderButtons = styled.ul`
  grid-area: buttons;
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  li + li {
    margin-left: -1px;
  }

  button {
    ${actionButton}
    padding-block: 6px 6px;

    &:where(:active:not([disabled])) {
      padding-block: 8px 4px;
    }
  }
`;

export const HeaderLoadButton = styled.button`
  grid-area: load;
  border: 0;
  /* UI/Text 13 line */
  font-size: 13px;
  line-height: 16px;
  text-decoration-line: underline;
  color: ${colors.blue[500]};
  background: transparent;
  cursor: pointer;
`;

export const RightPanel = LeftPanel;

export const RightPanelHeader = styled.div`
  position: sticky;
  top: -1px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid ${colors.basic[400]};
  border-left: 1px solid ${colors.basic[400]};
  background: ${colors.basic[100]};
`;

export const RightPanelBody = LeftPanelBody;

export const SelectedCounts = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SelectedCount = `
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px 4px;
  border-radius: 4px;
  /* UI/Text 12 bold */
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
`;
export const SelectedCountIncluded = styled.div`
  ${SelectedCount}
  color: ${colors.blue[500]};
  background: ${colors.blue[100]};
`;

export const SelectedCountExcluded = styled.div`
  ${SelectedCount}
  color: ${colors.red[500]};
  background: ${colors.red[100]};
`;

export const SelectedClearButton = styled.div`
  width: fit-content;
`;

export const SelectedPanelHeading = styled.p`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin: 0;
  border-bottom: 1px solid ${colors.basic[400]};
  border-left: 1px solid ${colors.basic[400]};
  /* UI/Text 13 */
  font-size: 13px;
  line-height: 16px;
  color: ${colors.basic[900]};
  background: ${colors.basic[200]};
`;

//
// -----------------------------------------------------------------------------
export const ItemActions = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (any-hover: hover) {
    opacity: 0;
    visibility: hidden;
  }

  li + li {
    margin-left: -1px;
  }

  button {
    ${actionButton}

    &[aria-pressed="true"] {
      color: var(--color);
    }

    &:disabled {
      visibility: hidden;
    }
  }

  li:nth-last-child(1 of li:has(button:not(:disabled))) button {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  li:nth-child(1 of li:has(button:not(:disabled))) button {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

export const DualListBox2Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  /* UI/Text 14 */
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.basic[900]};
  border-bottom: 1px dashed ${colors.basic[400]};
  transition: background 0.2s;

  &:hover {
    background: ${colors.basic[100]};
  }

  &:hover ${ItemActions} {
    visibility: visible;
    opacity: 1;
  }

  @media (any-hover: hover) {
    &:not(:hover) ${ItemActions}:has(button[aria-pressed="true"]) {
      visibility: visible;
      opacity: 1;

      button[aria-pressed="true"] {
        border-color: transparent;
        background: transparent;
        box-shadow: none;
      }

      button:not([aria-pressed="true"]) {
        visibility: hidden;
      }
    }
  }
`;

//
// -----------------------------------------------------------------------------
export const DualListBox2SelectedItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  /* UI/Text 14 */
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.basic[900]};
  border-bottom: 1px dashed ${colors.basic[400]};

  &:hover {
    background: ${colors.basic[100]};
  }

  button {
    flex-shrink: 0;
    width: 16px;
    aspect-ratio: 1;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: ${colors.basic[900]}
      url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22%3E%3Cpath fill=%22%23fff%22 d=%22M8 7 5.9 4.7l-1 1 2 2.2-2 2.1 1 1L8 9l2.1 2 1-1-2-2.1 2-2.1-1-1z%22/%3E%3C/svg%3E")
      no-repeat 50% 50%;
    cursor: pointer;
  }
`;

//
// -----------------------------------------------------------------------------
export const DualListBox2SelectedLabel = styled.div`
  padding: 8px 16px;
  margin: -1px 0 0;
  background: ${colors.basic[100]};
  /* UI/Text 12 */
  font-size: 12px;
  line-height: 14px;
  color: ${colors.basic[900]};
`;

//
// -----------------------------------------------------------------------------
export const AccordionHeader = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border-bottom: 1px solid ${colors.basic[400]};
  background: ${colors.basic[200]};
  transition: background 0.2s;

  &:hover {
    background: ${colors.basic[100]};
  }

  ${DualListBox2Item} + & {
    margin-top: -1px;
  }
`;

export const AccordionButton = styled.button`
  display: block;
  box-sizing: border-box;
  border: 0;
  margin: 0 auto 0 0;
  /* UI/Text 13 */
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  color: ${colors.basic[900]};
  background: transparent;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    display: block;
  }
`;

export const AccordionActionButtons = styled.ul`
  position: relative;
  grid-area: buttons;
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s,
    visibility 0s 0.2s;

  [aria-expanded="true"] + & {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s;
  }

  li + li {
    margin-left: -1px;
  }

  button {
    ${actionButton}

    &:disabled {
      visibility: hidden;
    }
  }

  li:nth-last-child(1 of li:has(button:not(:disabled))) button {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  li:nth-child(1 of li:has(button:not(:disabled))) button {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

export const AccordionIcon = styled.div`
  transition: rotate 0.2s;
  pointer-events: none;

  [aria-expanded="true"] ~ & {
    rotate: 180deg;
  }
`;

//
// -----------------------------------------------------------------------------
export const SectionButtonBefore = styled.span`
  flex-shrink: 0;
  width: 20px;
  transition:
    margin 0.2s,
    opacity 0.2s;
`;

export const SectionButtonAfter = styled.span`
  flex-shrink: 0;
  width: 20px;
  margin-left: auto;
  transition:
    margin 0.2s,
    opacity 0.2s;
`;

export const SectionButton = styled.button`
  position: sticky;
  top: -1px;
  z-index: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  margin: -1px 0 0;
  border-inline: 0;
  border-block: 1px solid ${colors.basic[400]};
  background: ${colors.basic[200]};
  transition: background 0.2s;
  overflow: hidden;

  &:hover {
    background: ${colors.basic[100]};
  }

  &:not([aria-expanded="true"]) ${SectionButtonBefore} {
    margin-left: -20px;
    opacity: 0;
  }

  &[aria-expanded="true"] ${SectionButtonAfter} {
    margin-right: -20px;
    opacity: 0;
  }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  color: ${colors.basic[600]};
  font-size: 13px;
  line-height: 16px;
`;

export const NestedAccordion = styled(DualListBox2Accordion)`
  padding-left: 24px;
`;

export const NestedItem = styled(DualListBox2Item)`
  padding-left: 48px;
`;
