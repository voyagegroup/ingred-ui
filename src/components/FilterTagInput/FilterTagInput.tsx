import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  useContext,
  type ReactElement,
  type KeyboardEvent,
} from "react";
import {
  FilterInputContext,
  FilterInputAbstract,
  FilterTag,
} from "../FilterInputAbstract/FilterInputAbstract";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import Modal from "../Modal";
import Fade from "../Fade";
import Button from "../Button";
import * as styled from "./styled";
import { FilterSize } from "../FilterInputAbstract/types";

//
// -----------------------------------------------------------------------------

// モーダル時の表示。設置される領域のサイズが小さいときのみに展開される
type FilterInputPanelProps = {
  isOpen: boolean;
  title: string;
  selectedIndex: number;
  values: string[];
  selectOptions: { icon: ReactElement; label: string }[];
  onApply: (values: string[], selectedIndex: number) => void;
  onClose: () => void;
  size?: FilterSize;
};

const FilterInputPanel = ({
  isOpen,
  title,
  values,
  selectedIndex,
  selectOptions,
  onApply,
  onClose,
  size = "medium",
}: FilterInputPanelProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isInlineComposing, setIsInlineComposing] = useState(false);
  const [userValues, setUserValues] = useState<string[]>([]);
  const [userSelectedIndex, setUserSelectedIndex] = useState(0);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const longestLabelOption = useMemo(() => {
    return selectOptions.reduce(
      (longestLabelOption, option) =>
        option.label.length > longestLabelOption.label.length
          ? option
          : longestLabelOption,
      selectOptions[0],
    );
  }, [selectOptions]);

  const inputEl = useRef<HTMLInputElement>(null);

  const handleSelectChange = useCallback((index: number) => {
    setUserSelectedIndex(index);
    setIsSelectOpen(false);
  }, []);

  const handleFocusTriggerClick = useCallback(() => {
    inputEl.current?.focus();
  }, []);

  const handleTagRemove = useCallback(
    (index: number) => {
      const newValues = [...userValues];
      newValues.splice(index, 1);
      setUserValues(newValues);
    },
    [userValues],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (isInlineComposing) return;
      if (!(event.target instanceof HTMLInputElement)) return;

      // 0 文字目で backspace を押した場合は、最後の値を削除する
      if (event.key === "Backspace" && event.target.selectionStart === 0) {
        setUserValues(userValues.slice(0, -1));
        return;
      }

      const trimmedValue = event.target.value.trim();
      if (trimmedValue === "" || userValues.includes(trimmedValue)) return;

      if (event.key === "Enter") {
        setUserValues([...userValues, trimmedValue]);
        setInputValue("");
      }
    },
    [userValues, setUserValues, isInlineComposing],
  );

  const handleClearButtonClick = useCallback(() => {
    setUserValues([]);
    setInputValue("");
  }, []);

  const handleChancelClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleApplyClick = useCallback(() => {
    onApply(userValues, userSelectedIndex);
    onClose();
  }, [userValues, userSelectedIndex, onApply, onClose]);

  // isOpen が true になったら、現状の値を初期値としてセットする
  // 「適用」するまでは、親に値を返さない
  useEffect(() => {
    if (!isOpen) return;

    setUserValues(values);
    setUserSelectedIndex(selectedIndex);
  }, [isOpen, selectedIndex, values]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Fade in={isOpen}>
        <styled.Panel>
          <styled.PanelTitle>{title}</styled.PanelTitle>
          <styled.PanelLeft>
            <styled.PanelLabel>条件</styled.PanelLabel>
            <ContextMenu2Container>
              <ContextMenu2
                open={isSelectOpen}
                trigger={
                  <styled.PanelSelectTrigger>
                    <styled.PanelSelectTriggerSpacer role="presentation">
                      {/* 最大文字数の幅を確保用 */}
                      {longestLabelOption.icon}
                      {longestLabelOption.label}
                    </styled.PanelSelectTriggerSpacer>
                    <styled.PanelSelectTriggerLabel>
                      {selectOptions[userSelectedIndex].icon}
                      {selectOptions[userSelectedIndex].label}
                    </styled.PanelSelectTriggerLabel>
                    <styled.PanelSelectTriggerIcon>
                      <Icon name="arrow_down" color="currentColor" />
                    </styled.PanelSelectTriggerIcon>
                  </styled.PanelSelectTrigger>
                }
                onOpenChange={(open) => setIsSelectOpen(open)}
              >
                {selectOptions.map(({ label, icon }, i) => (
                  <ContextMenu2CheckItem
                    key={label}
                    prepend={icon}
                    checked={userSelectedIndex === i}
                    onChange={() => handleSelectChange(i)}
                  >
                    {label}
                  </ContextMenu2CheckItem>
                ))}
              </ContextMenu2>
            </ContextMenu2Container>
          </styled.PanelLeft>
          <styled.PanelRight>
            <styled.PanelLabel>値</styled.PanelLabel>
            <styled.PanelTagField>
              <styled.PanelTagFieldFocusTrigger
                type="button"
                onClick={handleFocusTriggerClick}
              />
              {userValues.map((value, i) => (
                <FilterTag
                  key={value}
                  label={value}
                  size={size}
                  onRemove={() => handleTagRemove(i)}
                />
              ))}
              <styled.PanelInput>
                <input
                  ref={inputEl}
                  type="text"
                  aria-label="フィルターする値"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onCompositionStart={() => setIsInlineComposing(true)}
                  onCompositionEnd={() => setIsInlineComposing(false)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => setInputValue("")}
                />
                <styled.PanelInputSpacer>{inputValue}</styled.PanelInputSpacer>
              </styled.PanelInput>
              <styled.PanelClearButton
                type="button"
                onClick={handleClearButtonClick}
              >
                <Icon name="close_circle" type="fill" color="currentColor" />
              </styled.PanelClearButton>
            </styled.PanelTagField>
          </styled.PanelRight>
          <styled.PanelButtons>
            <li>
              <Button size="small" color="clear" onClick={handleChancelClick}>
                キャンセル
              </Button>
            </li>
            <li>
              <Button size="small" onClick={handleApplyClick}>
                適用
              </Button>
            </li>
          </styled.PanelButtons>
        </styled.Panel>
      </Fade>
    </Modal>
  );
};

//
// -----------------------------------------------------------------------------

// 本体のコンポーネント
type FilterTagInputProps = {
  title: string;
  values: string[];
  selectedIndex: number;
  selectOptions: { icon: ReactElement; label: string }[];
  onChange: (values: string[]) => void;
  onSelectChange: (index: number) => void;
  size?: FilterSize;
};
export const FilterTagInput = ({
  title,
  values,
  selectedIndex,
  selectOptions,
  onChange,
  onSelectChange,
  size = "medium",
}: FilterTagInputProps) => {
  const { isSmall } = useContext(FilterInputContext);
  const [inputValue, setInputValue] = useState("");
  const [isInlineOverflowing, setIsInlineOverflowing] = useState(false);
  const [isInlineComposing, setIsInlineComposing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inlineFieldEl = useRef<HTMLDivElement>(null);
  const inlineFieldInnerEl = useRef<HTMLDivElement>(null);
  const inlineInputEl = useRef<HTMLInputElement>(null);

  // inlineFieldEl の大きさを監視して、
  // overflow したら isInlineOverflowing を true にする
  const checkInlineOverflow = useCallback(() => {
    if (!inlineFieldEl.current) return;

    setIsInlineOverflowing(
      inlineFieldEl.current.clientWidth < inlineFieldEl.current.scrollWidth,
    );
  }, []);

  // inlineFieldEl が狭すぎる場合は、モーダルパネル内で入力させる。
  // その判定。
  const computeInlineFieldVisibleWidth = useCallback(() => {
    if (!inlineFieldEl.current || !inlineInputEl.current) return;

    // inlineInputEl がどれくらい見えているか？
    const inlineInputRect = inlineInputEl.current.getBoundingClientRect();
    const inlineFieldRect = inlineFieldEl.current.getBoundingClientRect();
    const inlineFieldPaddingRight = Number(
      window
        .getComputedStyle(inlineFieldEl.current)
        .paddingRight.replace("px", ""),
    );
    const visibleWidth =
      inlineFieldRect.right - inlineFieldPaddingRight - inlineInputRect.left;
    return visibleWidth;
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (isInlineComposing) return;
      if (!(event.target instanceof HTMLInputElement)) return;

      // 0 文字目で backspace を押した場合は、最後の値を削除する
      if (event.key === "Backspace" && event.target.selectionStart === 0) {
        onChange(values.slice(0, -1));
        requestAnimationFrame(() => {
          checkInlineOverflow();
          computeInlineFieldVisibleWidth();
        });
        return;
      }

      const trimmedValue = event.target.value.trim();
      if (trimmedValue === "" || values.includes(trimmedValue)) return;

      if (event.key === "Enter") {
        onChange([...values, trimmedValue]);
        setInputValue("");
        requestAnimationFrame(() => {
          checkInlineOverflow();
          computeInlineFieldVisibleWidth();
        });
      }
    },
    [
      values,
      onChange,
      setInputValue,
      isInlineComposing,
      checkInlineOverflow,
      computeInlineFieldVisibleWidth,
    ],
  );

  const handleTagRemove = useCallback(
    (index: number) => {
      const newValues = [...values];
      newValues.splice(index, 1);
      onChange(newValues);
      requestAnimationFrame(() => {
        checkInlineOverflow();
        computeInlineFieldVisibleWidth();
      });
    },
    [values, onChange, checkInlineOverflow, computeInlineFieldVisibleWidth],
  );

  const handlePanelApply = useCallback(
    (newValues: string[], newSelectedIndex: number) => {
      onChange(newValues);
      onSelectChange(newSelectedIndex);
      requestAnimationFrame(() => {
        checkInlineOverflow();
        computeInlineFieldVisibleWidth();
      });
    },
    [
      onChange,
      onSelectChange,
      checkInlineOverflow,
      computeInlineFieldVisibleWidth,
    ],
  );

  useEffect(() => {
    if (!window.ResizeObserver) return;
    if (!inlineFieldEl.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      if (!inlineFieldEl.current) return;
      checkInlineOverflow();
      computeInlineFieldVisibleWidth();
    });

    resizeObserver.observe(inlineFieldEl.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkInlineOverflow, computeInlineFieldVisibleWidth]);

  return (
    <>
      <FilterInputAbstract
        size={size}
        selectedIndex={selectedIndex}
        selectOptions={selectOptions}
        onSelectChange={onSelectChange}
      >
        <styled.InlineField ref={inlineFieldEl}>
          <styled.InlineFieldInner ref={inlineFieldInnerEl}>
            {values.map((value, i) => (
              <FilterTag
                key={value}
                label={value}
                size={size}
                onRemove={() => handleTagRemove(i)}
              />
            ))}
            <styled.InlineInput>
              {!inputValue && (
                <styled.InlineInputIcon>
                  <Icon name="filter" color="currentColor" />
                </styled.InlineInputIcon>
              )}
              <input
                ref={inlineInputEl}
                type="text"
                aria-label="フィルターする値"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onCompositionStart={() => setIsInlineComposing(true)}
                onCompositionEnd={() => setIsInlineComposing(false)}
                onKeyDown={handleKeyDown}
                onBlur={() => setInputValue("")}
              />
            </styled.InlineInput>
          </styled.InlineFieldInner>
        </styled.InlineField>
        <styled.OverflowIndicator
          type="button"
          aria-label="フィルター入力パネルを開く"
          data-overflowing={isInlineOverflowing}
          onClick={() => setIsModalOpen(true)}
        >
          <Icon
            name={isSmall ? "filter" : "expand_diagonal_s_fill"}
            color="currentColor"
          />
        </styled.OverflowIndicator>
      </FilterInputAbstract>
      <FilterInputPanel
        isOpen={isModalOpen}
        selectOptions={selectOptions}
        selectedIndex={selectedIndex}
        size={size}
        title={title}
        values={values}
        onApply={handlePanelApply}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
