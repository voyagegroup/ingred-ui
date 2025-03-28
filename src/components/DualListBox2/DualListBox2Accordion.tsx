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
import { LoadingMode } from "./DualListBox2";

export type DualListBox2AccordionProps = {
  label: string;
  disableInclude?: boolean;
  disableExclude?: boolean;
  children: ReactNode;
  onOpen?: () => void;
  loadingMode?: LoadingMode;
};

export const DualListBox2Accordion = React.forwardRef<HTMLDivElement, DualListBox2AccordionProps>(
  (
    {
      label,
      disableInclude,
      disableExclude,
      children,
      onOpen,
      loadingMode = 'infinite-loading',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    // allモードの場合は、マウント時にデータを読み込む
    useEffect(() => {
      if (loadingMode === 'bulk-loading' && onOpen) {
        onOpen();
      }
    }, [loadingMode, onOpen]);

    // アコーディオンの開閉時の処理
    useEffect(() => {
      const newIsOpen = isOpen; // local for closure
      if (newIsOpen && onOpen && loadingMode === 'infinite-loading') {
        onOpen();
      }
    }, [isOpen, onOpen, loadingMode]);

    const handleButtonClick = useCallback(() => {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      if (newIsOpen && onOpen && loadingMode === 'infinite-loading') {
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
      // このアコーディオン内のフィルタリングされたアイテムがすべて選択済みの場合は何もしない
      if (visibleIds.every((id) => includedIds.includes(id))) {
        return;
      }
      
      // このアコーディオン内のアイテムのみを追加対象とする
      onIncludedChange(Array.from(new Set([...includedIds, ...visibleIds])));
      
      // このアコーディオン内のアイテムが除外されていれば、それを除外リストから削除
      onExcludedChange(excludedIds.filter((id) => !visibleIds.includes(id)));
    }, [visibleIds, includedIds, excludedIds, onIncludedChange, onExcludedChange]);

    const handleExcludeAllButtonClick = useCallback(() => {
      // このアコーディオン内のフィルタリングされたアイテムがすべて除外済みの場合は何もしない
      if (visibleIds.every((id) => excludedIds.includes(id))) {
        return;
      }
      
      // このアコーディオン内のアイテムのみを除外対象とする
      onExcludedChange(Array.from(new Set([...excludedIds, ...visibleIds])));
      
      // このアコーディオン内のアイテムが追加されていれば、それを追加リストから削除
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
        {isOpen && <div ref={ref}>{children}</div>}
      </>
    );
  }
);
