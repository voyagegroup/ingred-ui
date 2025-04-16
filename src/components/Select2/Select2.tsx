import React, { useCallback, useMemo, useState, useRef, useEffect } from "react";
import Icon from "../Icon";
import Button from "../Button";
import {
  ContextMenu2,
  ContextMenu2CheckItem,
  ContextMenu2Container,
  ContextMenu2SeparatorItem,
  ContextMenu2ButtonControlsItem,
} from "../ContextMenu2";
import {
  Select2Container,
  SelectContainer,
  SelectButton,
  InputArea,
  SelectLabel,
  Placeholder,
  IconArea,
  StyledContextMenu2TextInputItem,
  TagContainer,
  StyledTag,
} from "./styled";
import { Select2Props, Select2Option } from "./types";

export const Select2 = ({
  options = [],
  value,
  onChange,
  multiple = false,
  disabled = false,
  placeholder = "選択してください",
  size = "medium",
  variant = "light",
  tagVariant,
  searchPlaceholder = "検索",
  noResultsMessage = "見つかりませんでした",
  error = false,
  applyButtonText = "適用",
  cancelButtonText = "キャンセル",
  ...rest
}: Select2Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // 複数選択時の一時的な選択状態
  const [tempSelectedValues, setTempSelectedValues] = useState<(string | number)[]>([]);
  // タグリスト部分で、CSS の overflow が発生しているか否か
  const [isTagOverflowing, setIsTagOverflowing] = useState(false);
  const tagContainerRef = useRef<HTMLDivElement>(null);

  // variant に応じたタグのバリアント（明示的に指定がある場合はそれを優先）
  const computedTagVariant = useMemo(() => {
    if (tagVariant) return tagVariant;
    return variant === "light" ? "dark" : "light";
  }, [variant, tagVariant]);

  // 単一/複数選択モードに関わらず、現在の選択値を配列として扱う
  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    } else {
      return value !== undefined ? [value as string | number] : [];
    }
  }, [value, multiple]);
  
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!disabled) {
        setIsOpen(open);
        if (open && multiple) {
          // 複数選択モードでメニューを開く時、現在の選択値を一時保存
          setTempSelectedValues([...selectedValues]);
        }
        if (!open) {
          setSearchValue("");
        }
      }
    },
    [disabled, multiple, selectedValues]
  );

  // 単一選択の場合の選択処理
  const handleSingleSelect = useCallback(
    (option: Select2Option) => {
      if (!option.disabled) {
        onChange?.(option.value as never);
        setIsOpen(false);
        setSearchValue("");
      }
    },
    [onChange]
  );

  // 複数選択の場合の選択処理（一時的な選択状態を更新）
  const handleMultipleSelect = useCallback(
    (option: Select2Option) => {
      if (option.disabled) return;

      setTempSelectedValues((prev) => {
        if (prev.includes(option.value)) {
          return prev.filter((v) => v !== option.value);
        } else {
          return [...prev, option.value];
        }
      });
    },
    []
  );

  // 複数選択モードでの確定処理
  const handleApply = useCallback(() => {
    onChange?.(tempSelectedValues as never);
    setIsOpen(false);
    setSearchValue("");
  }, [onChange, tempSelectedValues]);

  // 複数選択モードでのキャンセル処理
  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setSearchValue("");
  }, []);

  // タグ削除処理（複数選択モード用）
  const handleRemoveTag = useCallback(
    (valueToRemove: string | number) => {
      if (multiple && Array.isArray(value)) {
        const newValues = value.filter((v) => v !== valueToRemove);
        onChange?.(newValues as never);
      }
    },
    [multiple, value, onChange]
  );

  // 単一選択モードの場合の選択されたオプション
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  // 複数選択モードの場合の選択されたオプションリスト
  const selectedOptions = useMemo(() => {
    if (!multiple || !Array.isArray(value)) return [];
    return options.filter((option) => value.includes(option.value));
  }, [multiple, options, value]);

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  // tagContainerRef の大きさを監視して、
  // overflow したら isTagOverflowing を true にする
  const checkTagOverflow = useCallback(() => {
    if (!tagContainerRef.current) return;

    setIsTagOverflowing(
      tagContainerRef.current.scrollWidth > tagContainerRef.current.clientWidth
    );
  }, []);

  useEffect(() => {
    if (!window.ResizeObserver) return;
    if (!tagContainerRef.current) return;

    checkTagOverflow();

    const resizeObserver = new window.ResizeObserver(() => {
      if (!tagContainerRef.current) return;
      checkTagOverflow();
    });

    resizeObserver.observe(tagContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkTagOverflow, selectedOptions]);

  // 検索窓を上部に固定
  const stickyHeader = useMemo(() => (
    <StyledContextMenu2TextInputItem
      autoFocus
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder={searchPlaceholder}
    />
  ), [searchValue, searchPlaceholder]);

  // 適用/キャンセルボタンを下部に固定（複数選択モードの場合のみ）
  const stickyFooter = useMemo(() => {
    if (!multiple) return null;
    
    return (
      <ContextMenu2ButtonControlsItem>
        <Button
          size="small"
          color="clear"
          onClick={handleCancel}
        >
          {cancelButtonText}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={handleApply}
          disabled={tempSelectedValues.length === 0}
        >
          {applyButtonText}
        </Button>
      </ContextMenu2ButtonControlsItem>
    );
  }, [
    multiple, 
    tempSelectedValues, 
    handleApply, 
    handleCancel, 
    applyButtonText, 
    cancelButtonText
  ]);

  return (
    <Select2Container>
      <SelectContainer 
        $size={size}
        $variant={variant} 
        $disabled={disabled}
        $error={error}
        $isOpen={isOpen}
        data-overflowing={isTagOverflowing}
        data-disabled={disabled}
        style={{
          cursor: !multiple && !disabled ? 'pointer' : 'default'
        }}
      >
        <ContextMenu2Container>
          <ContextMenu2
            open={isOpen}
            onOpenChange={handleOpenChange}
            stickyHeader={stickyHeader}
            stickyFooter={stickyFooter}
            trigger={
              <SelectButton
                type="button"
                $size={size}
                $variant={variant}
                $error={error}
                $disabled={disabled}
                $isOpen={isOpen}
                $hasValue={multiple ? (Array.isArray(value) && value.length > 0) : !!selectedOption}
                $multiple={multiple}
                disabled={disabled}
                role="listbox"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-invalid={error}
                {...rest}
              >
                {!multiple && (
                  <SelectLabel>
                    {selectedOption ? (
                      selectedOption.label
                    ) : (
                      <Placeholder $variant={variant} $disabled={disabled}>
                        {placeholder}
                      </Placeholder>
                    )}
                  </SelectLabel>
                )}
                <IconArea $size={size} $disabled={disabled}>
                  <Icon name="arrow_down" color="currentColor" />
                </IconArea>
              </SelectButton>
            }
            noResultsMessage={noResultsMessage}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <ContextMenu2CheckItem
                  key={option.value.toString()}
                  checked={multiple 
                    ? tempSelectedValues.includes(option.value)
                    : option.value === value
                  }
                  onChange={() => 
                    multiple 
                      ? handleMultipleSelect(option)
                      : handleSingleSelect(option)
                  }
                  closeOnChange={!multiple}
                  disabled={option.disabled}
                >
                  {option.label}
                </ContextMenu2CheckItem>
              ))
            ) : (
              <ContextMenu2SeparatorItem label={noResultsMessage} />
            )}
          </ContextMenu2>
        </ContextMenu2Container>
        
        {multiple && (
          <InputArea>
            <TagContainer 
              ref={tagContainerRef}
              onClick={(e) => {
                // タグコンテナのクリックイベントを親（SelectButton）に伝播させない
                e.stopPropagation();
              }}
            >
              {selectedOptions.map((option) => (
                <StyledTag
                  key={option.value.toString()}
                  label={option.label}
                  size={size}
                  variant={computedTagVariant}
                  disabled={disabled}
                  onRemove={
                    disabled
                      ? undefined
                      : () => handleRemoveTag(option.value)
                  }
                />
              ))}
            </TagContainer>
          </InputArea>
        )}
      </SelectContainer>
    </Select2Container>
  );
}; 