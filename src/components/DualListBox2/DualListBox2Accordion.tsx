import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import Icon from "../Icon";
import * as styled from "./styled";
import { colors } from "../../styles";
import { DualListBox2Context, getAllIds } from "./lib";

type DualListBox2AccordionProps = {
  label: string;
  disableInclude?: boolean;
  disableExclude?: boolean;
  children: ReactNode;
};

export const DualListBox2Accordion = ({
  label,
  disableInclude,
  disableExclude,
  children,
}: DualListBox2AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  //
  const { includedIds, excludedIds, onIncludedChange, onExcludedChange } =
    useContext(DualListBox2Context);

  const allIds = useMemo(() => getAllIds(children), [children]);

  const handleIncludeAllButtonClick = useCallback(() => {
    // すでにアコーディオン内が全選択されていたら、なにもしない
    if (allIds.every((id) => includedIds.includes(id))) {
      return;
    }
    onIncludedChange(Array.from(new Set([...includedIds, ...allIds])));
    onExcludedChange(excludedIds.filter((id) => !allIds.includes(id)));
  }, [allIds, includedIds, excludedIds, onIncludedChange, onExcludedChange]);

  const handleExcludeAllButtonClick = useCallback(() => {
    // すでにアコーディオン内が全選択されていたら、なにもしない
    if (allIds.every((id) => excludedIds.includes(id))) {
      return;
    }
    onExcludedChange(Array.from(new Set([...excludedIds, ...allIds])));
    onIncludedChange(includedIds.filter((id) => !allIds.includes(id)));
  }, [allIds, includedIds, excludedIds, onIncludedChange, onExcludedChange]);

  return (
    <>
      <styled.AccordionHeader>
        <styled.AccordionButton
          type="button"
          aria-label={`${label}を開く`}
          aria-expanded={isOpen}
          onClick={handleButtonClick}
        >
          {label}
        </styled.AccordionButton>
        <styled.AccordionActionButtons>
          <li>
            <button
              type="button"
              disabled={disableInclude}
              aria-label="追加"
              onClick={handleIncludeAllButtonClick}
            >
              <Icon name="check_thin" color={colors.blue[500]} />
            </button>
          </li>
          <li>
            <button
              type="button"
              disabled={disableExclude}
              aria-label="除外"
              onClick={handleExcludeAllButtonClick}
            >
              <Icon name="forbid" color={colors.red[500]} />
            </button>
          </li>
        </styled.AccordionActionButtons>
        <styled.AccordionIcon>
          <Icon name="arrow_down" color={colors.basic[900]} />
        </styled.AccordionIcon>
      </styled.AccordionHeader>
      {isOpen && children}
    </>
  );
};
