import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  type ReactElement,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import {
  FilterInputAbstract,
  FilterTag,
} from "../FilterInputAbstract/FilterInputAbstract";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2CheckItem,
  ContextMenu2ButtonControlsItem,
} from "../ContextMenu2";
import Button from "../Button";
import Icon from "../Icon";
import * as styled from "./styled";
import { FilterSize, FilterVariant } from "../FilterInputAbstract/types";
import { ContextMenu2NoResultsMessage } from "../ContextMenu2/ContextMenu2NoResultsMessage";

type FilterTagInputProps = {
  values: string[];
  options: (string | string[])[];
  selectedIndex: number;
  selectOptions: { icon: ReactElement; label: string }[];
  onChange: (values: string[]) => void;
  onSelectChange: (index: number) => void;
  size?: FilterSize;
  variant?: FilterVariant;
  tagVariant?: FilterVariant;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  disabled?: boolean;
  applyButtonText?: string;
  cancelButtonText?: string;
  error?: boolean;
};

export const FilterComboBox = ({
  values,
  options,
  selectedIndex,
  selectOptions,
  onChange,
  onSelectChange,
  size = "medium",
  variant = "dark",
  tagVariant,
  searchPlaceholder = "検索",
  noResultsMessage = "見つかりませんでした",
  disabled = false,
  applyButtonText = "適用",
  cancelButtonText = "キャンセル",
  error = false,
}: FilterTagInputProps) => {
  const [userValue, setUserValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [tempValues, setTempValues] = useState<string[]>(values);
  const [isOpen, setIsOpen] = useState(false);

  // タグのvariantを計算: 明示的に指定されていれば、それを使用。そうでなければvariantに応じて自動的に設定
  const computedTagVariant = useMemo(() => {
    if (tagVariant) return tagVariant;
    return variant === "light" ? "dark" : "light";
  }, [variant, tagVariant]);

  // タグリスト部分で、CSS の overflow が発生しているか否か
  const [isInlineOverflowing, setIsInlineOverflowing] = useState(false);
  const tagListRef = useRef<HTMLDivElement>(null);

  // tagListRef の大きさを監視して、
  // overflow したら isInlineOverflowing を true にする
  const checkInlineOverflow = useCallback(() => {
    if (!tagListRef.current) return;

    setIsInlineOverflowing(
      tagListRef.current.clientWidth < tagListRef.current.scrollWidth,
    );
  }, []);

  // userValue の入力状況に応じてフィルターされた options。
  // ただし、options は string | string[] なので、フィルターのついでに string[] に統一する。
  const getFilteredOptions = useCallback(
    (value: string) => {
      const trimmedValue = value.trim();
      if (!trimmedValue)
        return options.map((option) => {
          return !Array.isArray(option) ? [option] : option;
        });

      const filtered = options.filter((option) => {
        if (!Array.isArray(option)) return option.includes(trimmedValue);
        return option.some((o) => o.includes(trimmedValue));
      });
      const normalized = filtered.map((option) => {
        return !Array.isArray(option) ? [option] : option;
      });
      return normalized;
    },
    [options],
  );

  const filteredOptions = useMemo(() => {
    return getFilteredOptions(userValue);
  }, [userValue, getFilteredOptions]);

  const handleSelect = useCallback(
    (value: string) => {
      if (tempValues.includes(value)) {
        setTempValues(tempValues.filter((v) => v !== value));
      } else {
        setTempValues([...tempValues, value]);
      }
    },
    [tempValues],
  );

  const handleEnter = useCallback(() => {
    if (isComposing) return;
    if (!userValue.trim()) return;

    const filteredOptions = getFilteredOptions(userValue);

    if (filteredOptions.length !== 1) return;
    handleSelect(filteredOptions[0][0]);
    setUserValue("");
  }, [isComposing, userValue, getFilteredOptions, handleSelect]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserValue(event.target.value);
    },
    [setUserValue],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        return;
      }
    },
    [],
  );

  const handleRemove = useCallback(
    (value: string) => {
      const newValues = values.filter((v) => v !== value);
      onChange(newValues);
      setTempValues(newValues);
    },
    [values, onChange],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (open) {
        setTempValues(values);
      }
      setUserValue("");
    },
    [values],
  );

  const handleApply = useCallback(() => {
    onChange(tempValues);
    setIsOpen(false);
  }, [onChange, tempValues]);

  const handleCancel = useCallback(() => {
    setTempValues(values);
    setIsOpen(false);
  }, [values]);

  // 検索窓を上部に固定
  const stickyHeader = useMemo(
    () => (
      <styled.StyledContextMenu2TextInputItem
        autoFocus
        value={userValue}
        placeholder={searchPlaceholder}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onEnter={handleEnter}
      />
    ),
    [userValue, searchPlaceholder, handleOnChange, handleKeyDown, handleEnter],
  );

  // 適用/キャンセルボタンを下部に固定
  const stickyFooter = useMemo(
    () => (
      <ContextMenu2ButtonControlsItem>
        <Button size="small" color="clear" onClick={handleCancel}>
          {cancelButtonText}
        </Button>
        <Button size="small" onClick={handleApply}>
          {applyButtonText}
        </Button>
      </ContextMenu2ButtonControlsItem>
    ),
    [handleCancel, handleApply, applyButtonText, cancelButtonText],
  );

  useEffect(() => {
    if (!window.ResizeObserver) return;
    if (!tagListRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      if (!tagListRef.current) return;
      checkInlineOverflow();
    });

    resizeObserver.observe(tagListRef.current);
    // 初回チェック
    checkInlineOverflow();

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkInlineOverflow]);

  return (
    <FilterInputAbstract
      size={size}
      selectedIndex={selectedIndex}
      selectOptions={selectOptions}
      disabled={disabled}
      error={error}
      isOpen={isOpen}
      onSelectChange={onSelectChange}
    >
      <styled.SelectContainer
        $variant={variant}
        data-overflowing={isInlineOverflowing}
      >
        <ContextMenu2Container>
          <ContextMenu2
            open={isOpen && !disabled}
            trigger={
              <styled.Select
                type="button"
                $variant={variant}
                disabled={disabled}
                aria-label="タグを追加"
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => {
                  if (disabled) return;
                  setIsOpen(!isOpen);
                }}
              >
                <styled.SelectIcon>
                  <Icon name="arrow_down" color="currentColor" />
                </styled.SelectIcon>
              </styled.Select>
            }
            stickyHeader={stickyHeader}
            stickyFooter={stickyFooter}
            noResultsMessage={noResultsMessage}
            // eslint-disable-next-line react/jsx-handler-names
            onOpenChange={(open) => !disabled && handleOpenChange(open)}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <ContextMenu2CheckItem
                  key={option[0]}
                  checked={tempValues.includes(option[0])}
                  closeOnChange={false}
                  onChange={() => handleSelect(option[0])}
                >
                  {option[0]}
                </ContextMenu2CheckItem>
              ))
            ) : (
              <ContextMenu2NoResultsMessage message={noResultsMessage} />
            )}
          </ContextMenu2>
        </ContextMenu2Container>
        <styled.TagList ref={tagListRef}>
          {values.map((value) => (
            <FilterTag
              key={value}
              label={value}
              size={size}
              variant={computedTagVariant}
              onRemove={() => handleRemove(value)}
            />
          ))}
        </styled.TagList>
      </styled.SelectContainer>
    </FilterInputAbstract>
  );
};
