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
  /** データをすべて読み込むため処理。onOpenと異なりアコーディオンは開きません */
  onLoadAll?: () => void;
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
      onLoadAll,
      loadingMode = 'infinite-loading',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasLoadedAll, setHasLoadedAll] = useState(false);

    const { 
      filterWords, 
      includedIds, 
      excludedIds, 
      onIncludedChange, 
      onExcludedChange,
      registerAccordion,
      unregisterAccordion
    } = useContext(DualListBox2Context);

    // アコーディオンIDを生成（ラベルからID生成）
    const accordionId = useMemo(() => `accordion-${label}`, [label]);

    // コンポーネントのマウント時に登録、アンマウント時に解除
    useEffect(() => {
      if (registerAccordion) {
        registerAccordion(accordionId, { onLoadAll });
      }

      return () => {
        if (unregisterAccordion) {
          unregisterAccordion(accordionId);
        }
      };
    }, [accordionId, registerAccordion, unregisterAccordion, onLoadAll]);

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

    // 検索フィルタが適用された時にデータを読み込む
    useEffect(() => {
      // infinite-loadingモードで、検索フィルタが適用された場合かつ検索ワードが空でない場合
      if (filterWords.length > 0 && !isOpen) {
        if (onLoadAll && loadingMode === 'infinite-loading' && !hasLoadedAll) {
          // 検索時には全データを一括で読み込み、再読み込みしないようフラグを立てる
          onLoadAll();
          setHasLoadedAll(true);
        } else if (onOpen && loadingMode === 'infinite-loading') {
          // onLoadAllが提供されていない場合は、従来通りonOpenを呼ぶ
          onOpen();
        }
      }
    }, [filterWords, onOpen, onLoadAll, loadingMode, isOpen, hasLoadedAll]);

    // 検索フィルタがクリアされた場合、hasLoadedAllフラグをリセット
    useEffect(() => {
      if (filterWords.length === 0) {
        setHasLoadedAll(false);
      }
    }, [filterWords]);

    const handleButtonClick = useCallback(() => {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      if (newIsOpen && onOpen && loadingMode === 'infinite-loading') {
        onOpen();
      }
    }, [isOpen, onOpen, loadingMode]);

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

    // 検索フィルタに一致するアイテムが存在するかどうか
    const hasMatchingItems = useMemo(() => {
      return visibleIds.length > 0;
    }, [visibleIds]);

    // early returnを削除し、JSXレンダリングで条件分岐を行う
    const shouldRenderAccordion = !(filterWords.length > 0 && !hasMatchingItems);

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
        {shouldRenderAccordion && (
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
        )}
      </>
    );
  }
);
