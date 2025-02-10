import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactElement,
  type KeyboardEvent,
} from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  size,
  autoPlacement,
  autoUpdate,
  FloatingPortal,
} from "@floating-ui/react";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import Button from "../Button";
import * as styled from "./styled";
import { colors } from "../../styles";

type FilterTagProps = {
  label: string;
  onRemove: () => void;
};

const FilterTag = ({ label, onRemove }: FilterTagProps) => {
  return (
    <styled.FilterTag>
      {label}
      <styled.FilterTagButton aria-label="削除" onClick={onRemove}>
        <Icon name="close_circle" type="fill" color={colors.basic[900]} />
      </styled.FilterTagButton>
    </styled.FilterTag>
  );
};

//
// -----------------------------------------------------------------------------

// モーダル時の表示。設置される領域のサイズが小さいときのみに展開される
type FilterInputPanelProps = {
  isSmall: boolean;
  selectedIndex: number;
  values: string[];
  selectOptions: { icon: ReactElement; label: string }[];
  onApply: (values: string[], selectedIndex: number) => void;
  onClose: () => void;
};

const FilterInputPanel = ({
  isSmall,
  values,
  selectedIndex,
  selectOptions,
  onApply,
  onClose,
}: FilterInputPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [isInlineComposing, setIsInlineComposing] = useState(false);
  const [userValues, setUserValues] = useState<string[]>([]);
  const [userSelectedIndex, setUserSelectedIndex] = useState(0);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

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
    setIsOpen(false);
  }, []);

  const handleApplyClick = useCallback(() => {
    onApply(userValues, userSelectedIndex);
    setIsOpen(false);
  }, [userValues, userSelectedIndex, onApply]);

  // isOpen が true になったら、現状の値を初期値としてセットする
  // 「適用」するまでは、親に値を返さない
  useEffect(() => {
    if (!isOpen) return;

    setUserValues(values);
    setUserSelectedIndex(selectedIndex);
  }, [isOpen, selectedIndex, values]);

  //

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open: boolean) => {
      setIsOpen(open);
    },
    middleware: [
      offset({
        mainAxis: 5,
        crossAxis: 0,
      }),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${Math.max(0, availableWidth)}px`,
            maxHeight: `${Math.max(0, availableHeight)}px`,
          });
        },
      }),
      autoPlacement(() => ({
        allowedPlacements: [
          "bottom-start",
          "bottom-end",
          "top-start",
          "top-end",
        ],
      })),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <styled.OverflowIndicator
        ref={refs.setReference}
        type="button"
        aria-label="フィルター入力パネルを開く"
        onClick={() => setIsOpen(true)}
        {...getReferenceProps()}
      >
        <Icon
          name={isSmall ? "filter" : "expand_diagonal_s_fill"}
          color={colors.basic[900]}
        />
      </styled.OverflowIndicator>
      {isOpen && (
        <FloatingPortal>
          <styled.Panel
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              // width,
            }}
            {...getFloatingProps()}
            tabIndex={-1}
          >
            <styled.PanelLeft>
              <styled.PanelLabel>条件</styled.PanelLabel>
              <ContextMenu2Container>
                <ContextMenu2
                  open={isSelectOpen}
                  trigger={
                    <styled.PanelSelectTrigger>
                      <styled.PanelSelectTriggerLabel>
                        {selectOptions[userSelectedIndex].label}
                      </styled.PanelSelectTriggerLabel>
                      <styled.PanelSelectTriggerIcon>
                        <Icon name="arrow_down" color={colors.basic[900]} />
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
                  />
                  <styled.PanelInputSpacer>
                    {inputValue}
                  </styled.PanelInputSpacer>
                </styled.PanelInput>
                <styled.PanelClearButton
                  type="button"
                  onClick={handleClearButtonClick}
                >
                  <Icon
                    name="close_circle"
                    type="fill"
                    color={colors.basic[900]}
                  />
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
        </FloatingPortal>
      )}
    </>
  );
};

//
// -----------------------------------------------------------------------------

// 本体のコンポーネント
type FilterTagInputProps = {
  values: string[];
  selectedIndex: number;
  selectOptions: { icon: ReactElement; label: string }[];
  onChange: (values: string[]) => void;
  onSelectChange: (index: number) => void;
};
export const FilterTagInput = ({
  values,
  selectedIndex,
  selectOptions,
  onChange,
  onSelectChange,
}: FilterTagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isInlineOverflowing, setIsInlineOverflowing] = useState(false);
  const [isInlineComposing, setIsInlineComposing] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  // 本来なら CSS Container Query で判定したいけれど、
  // styled-components v6 未満では未対応
  const [isSmall, setIsSmall] = useState(false);

  const el = useRef<HTMLDivElement>(null);
  const inlineFieldEl = useRef<HTMLDivElement>(null);
  const inlineFieldInnerEl = useRef<HTMLDivElement>(null);
  const inlineInputEl = useRef<HTMLInputElement>(null);

  // inlineFieldEl の大きさを監視して、
  // overflow したら isInlineOverflowing を true にする
  const checkInlineOverflow = useCallback(() => {
    if (!inlineFieldEl.current || !inlineInputEl.current) return;

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

  const handleSelectChange = useCallback(
    (index: number) => {
      onSelectChange(index);
      setIsSelectOpen(false);
    },
    [onSelectChange, setIsSelectOpen],
  );

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

    const resizeObserver1 = new window.ResizeObserver(() => {
      if (!el.current) return;
      setIsSmall(el.current.clientWidth < 130);
    });

    el.current && resizeObserver1.observe(el.current);

    const resizeObserver2 = new window.ResizeObserver(() => {
      if (!inlineFieldEl.current) return;
      checkInlineOverflow();
      computeInlineFieldVisibleWidth();
    });

    inlineFieldEl.current && resizeObserver2.observe(inlineFieldEl.current);

    return () => {
      resizeObserver1.disconnect();
      resizeObserver2.disconnect();
    };
  }, [setIsSmall, checkInlineOverflow, computeInlineFieldVisibleWidth]);

  return (
    <styled.FilterTagInput
      ref={el}
      data-small={isSmall}
      data-overflowing={isInlineOverflowing}
    >
      <ContextMenu2Container>
        <ContextMenu2
          open={isSelectOpen}
          trigger={
            <styled.DropDownTrigger
              type="button"
              aria-label="フィルターのタイプを選ぶ"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              {selectOptions[selectedIndex].icon}
            </styled.DropDownTrigger>
          }
          onOpenChange={(open) => setIsSelectOpen(open)}
        >
          {selectOptions.map(({ label, icon }, i) => (
            <ContextMenu2CheckItem
              key={label}
              prepend={icon}
              checked={selectedIndex === i}
              onChange={() => handleSelectChange(i)}
            >
              {label}
            </ContextMenu2CheckItem>
          ))}
        </ContextMenu2>
      </ContextMenu2Container>
      <styled.InlineField ref={inlineFieldEl}>
        <styled.InlineFieldInner ref={inlineFieldInnerEl}>
          {values.map((value, i) => (
            <FilterTag
              key={value}
              label={value}
              onRemove={() => handleTagRemove(i)}
            />
          ))}
          <styled.InlineInput>
            {!inputValue && (
              <styled.InlineInputIcon>
                <Icon name="filter" />
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
            />
          </styled.InlineInput>
        </styled.InlineFieldInner>
      </styled.InlineField>
      <FilterInputPanel
        isSmall={isSmall}
        values={values}
        selectedIndex={selectedIndex}
        selectOptions={selectOptions}
        onApply={handlePanelApply}
      />
    </styled.FilterTagInput>
  );
};
