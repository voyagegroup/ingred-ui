import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
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
import { Select2Size, Select2Variant } from "./types";
import { TagVariant } from "../Tag/types";

// 内部定義と競合しないように名前を変更
type Select2Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

type Select2Props = {
  value: (string | number) | (string | number)[];
  onChange: (value: (string | number) | (string | number)[]) => void;
  options: Select2Option[];
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: Select2Size;
  variant?: Select2Variant;
  tagVariant?: TagVariant;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  error?: boolean;
  applyButtonText?: string;
  cancelButtonText?: string;
};

export const Select2: React.FC<Select2Props> = ({
  options = [],
  value,
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
  onChange,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [tempSelectedValues, setTempSelectedValues] = useState<
    (string | number)[]
  >([]);
  const [isTagOverflowing, setIsTagOverflowing] = useState(false);
  const tagContainerRef = useRef<HTMLDivElement>(null);

  const computedTagVariant = useMemo(() => {
    if (tagVariant) return tagVariant;
    return variant === "light" ? "dark" : "light";
  }, [variant, tagVariant]);

  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    } else {
      return value !== undefined ? [value as string | number] : [];
    }
  }, [value, multiple]);

  const handleChange = useCallback(
    (newValue: string | number | (string | number)[]) => {
      onChange?.(newValue as never);
    },
    [onChange],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!disabled) {
        setIsOpen(open);
        if (open && multiple) {
          setTempSelectedValues([...selectedValues]);
        }
        if (!open) {
          setSearchValue("");
        }
      }
    },
    [disabled, multiple, selectedValues],
  );

  const handleSingleSelect = useCallback(
    (option: Select2Option) => {
      if (!option.disabled) {
        handleChange(option.value);
        setIsOpen(false);
        setSearchValue("");
      }
    },
    [handleChange],
  );

  const handleMultipleSelect = useCallback(
    (checked: boolean, option: Select2Option) => {
      if (option.disabled) return;

      setTempSelectedValues((prev) => {
        const newValues = checked
          ? [...prev, option.value]
          : prev.filter((v) => v !== option.value);
        return newValues;
      });
    },
    [],
  );

  const handleApply = useCallback(() => {
    if (multiple) {
      handleChange(tempSelectedValues);
    }
    setIsOpen(false);
    setSearchValue("");
  }, [handleChange, multiple, tempSelectedValues]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setSearchValue("");
  }, []);

  const handleTagRemove = useCallback(
    (tagValue: string | number) => {
      if (multiple && Array.isArray(value)) {
        const newValues = (value as (string | number)[]).filter(
          (v) => v !== tagValue,
        );
        handleChange(newValues);
      }
    },
    [multiple, value, handleChange],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  const handleTagContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const selectedOptions = useMemo(() => {
    if (!multiple || !Array.isArray(value)) return [];
    return options.filter((option) => value.includes(option.value));
  }, [multiple, options, value]);

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [options, searchValue]);

  const checkTagOverflow = useCallback(() => {
    if (!tagContainerRef.current) return;

    setIsTagOverflowing(
      tagContainerRef.current.scrollWidth > tagContainerRef.current.clientWidth,
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

  useEffect(() => {
    if (multiple && Array.isArray(value)) {
      setTempSelectedValues(value);
    }
  }, [multiple, value]);

  const stickyHeader = useMemo(
    () => (
      <StyledContextMenu2TextInputItem
        autoFocus
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={handleSearchChange}
      />
    ),
    [searchValue, searchPlaceholder, handleSearchChange],
  );

  const stickyFooter = useMemo(() => {
    if (!multiple) return null;

    return (
      <ContextMenu2ButtonControlsItem>
        <Button color="clear" size="small" onClick={handleCancel}>
          {cancelButtonText}
        </Button>
        <Button
          color="primary"
          disabled={tempSelectedValues.length === 0}
          size="small"
          onClick={handleApply}
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
    cancelButtonText,
  ]);

  const triggerElement = (
    <SelectButton
      $disabled={disabled}
      $error={error}
      $hasValue={
        multiple ? Array.isArray(value) && value.length > 0 : !!selectedOption
      }
      $isOpen={isOpen}
      $multiple={multiple}
      $size={size}
      $variant={variant}
      aria-expanded={isOpen}
      aria-invalid={error}
      disabled={disabled}
      role="combobox"
      type="button"
      {...rest}
    >
      {!multiple && (
        <SelectLabel>
          {selectedOption ? (
            selectedOption.label
          ) : (
            <Placeholder $disabled={disabled} $variant={variant}>
              {placeholder}
            </Placeholder>
          )}
        </SelectLabel>
      )}
      <IconArea $disabled={disabled} $size={size}>
        <Icon name="arrow_down" color="currentColor" />
      </IconArea>
    </SelectButton>
  );

  return (
    <Select2Container>
      <SelectContainer
        $disabled={disabled}
        $error={error}
        $isOpen={isOpen}
        $size={size}
        $variant={variant}
        data-disabled={disabled}
        data-overflowing={isTagOverflowing}
        style={{
          cursor: !multiple && !disabled ? "pointer" : "default",
        }}
      >
        <ContextMenu2Container>
          <ContextMenu2
            noResultsMessage={noResultsMessage}
            open={isOpen}
            stickyFooter={stickyFooter}
            stickyHeader={stickyHeader}
            trigger={triggerElement}
            onOpenChange={handleOpenChange}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isChecked = multiple
                  ? tempSelectedValues.includes(option.value)
                  : option.value === value;

                const handleChange = () => {
                  if (multiple) {
                    handleMultipleSelect(!isChecked, option);
                  } else {
                    handleSingleSelect(option);
                  }
                };

                return (
                  <ContextMenu2CheckItem
                    key={option.value.toString()}
                    checked={isChecked}
                    closeOnChange={!multiple}
                    disabled={option.disabled}
                    onChange={handleChange as any}
                  >
                    {option.label}
                  </ContextMenu2CheckItem>
                );
              })
            ) : (
              <ContextMenu2SeparatorItem label={noResultsMessage} />
            )}
          </ContextMenu2>
        </ContextMenu2Container>

        {multiple && (
          <InputArea>
            <TagContainer
              ref={tagContainerRef}
              onClick={handleTagContainerClick}
            >
              {selectedOptions.map((option) => {
                return (
                  <StyledTag
                    key={option.value.toString()}
                    disabled={disabled}
                    label={option.label}
                    size={size}
                    variant={computedTagVariant}
                    // eslint-disable-next-line react/jsx-handler-names
                    onRemove={
                      disabled ? undefined : () => handleTagRemove(option.value)
                    }
                  />
                );
              })}
            </TagContainer>
          </InputArea>
        )}
      </SelectContainer>
    </Select2Container>
  );
};
