import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import Icon from "../Icon";
import * as styled from "./styled";
import { colors } from "../../styles";
import { DualListBox2Context, getAllIds, extractAllItems } from "./lib";

type DualListBox2AccordionProps = {
  label: string;
  disableInclude?: boolean;
  disableExclude?: boolean;
  children: ReactNode;
  onOpen?: () => void;
  loadingMode?: 'infinite' | 'all';
};

export const DualListBox2Accordion = ({
  label,
  disableInclude,
  disableExclude,
  children,
  onOpen,
  loadingMode = 'infinite',
}: DualListBox2AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // allモードの場合は、マウント時にデータを読み込む
  useEffect(() => {
    if (loadingMode === 'all' && onOpen) {
      onOpen();
    }
  }, [loadingMode, onOpen]);

  const handleButtonClick = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen && onOpen && loadingMode === 'infinite') {
      onOpen();
    }
  }, [isOpen, onOpen, loadingMode]);

  const { filterWords, includedIds, excludedIds, onIncludedChange, onExcludedChange } =
    useContext(DualListBox2Context);

  const allIds = useMemo(() => getAllIds(children), [children]);

  // 現在のフィルターに基づいて表示されているアイテムのIDだけを取得
  const visibleIds = useMemo(() => {
    if (filterWords.length === 0) return allIds;

    const items = extractAllItems(children);
    return items
      .filter(item =>
        filterWords.every(word =>
          item.label && item.label.toString().includes(word)
        )
      )
      .map(item => item.id);
  }, [allIds, children, filterWords]);

  const handleIncludeAllButtonClick = useCallback(() => {
    // フィルタリングされたアイテムがすべて選択済みの場合は何もしない
    if (visibleIds.every((id) => includedIds.includes(id))) {
      return;
    }
    onIncludedChange(Array.from(new Set([...includedIds, ...visibleIds])));
    onExcludedChange(excludedIds.filter((id) => !visibleIds.includes(id)));
  }, [visibleIds, includedIds, excludedIds, onIncludedChange, onExcludedChange]);

  const handleExcludeAllButtonClick = useCallback(() => {
    // フィルタリングされたアイテムがすべて除外済みの場合は何もしない
    if (visibleIds.every((id) => excludedIds.includes(id))) {
      return;
    }
    onExcludedChange(Array.from(new Set([...excludedIds, ...visibleIds])));
    onIncludedChange(includedIds.filter((id) => !visibleIds.includes(id)));
  }, [visibleIds, includedIds, excludedIds, onIncludedChange, onExcludedChange]);

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
