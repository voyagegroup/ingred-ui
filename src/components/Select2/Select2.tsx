import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from "react";
import Icon from "../Icon";
import Button from "../Button";
import {
  ContextMenu2,
  ContextMenu2CheckItem,
  ContextMenu2Container,
  ContextMenu2ButtonControlsItem,
  ContextMenu2HeadingItem,
  ContextMenu2SeparatorItem,
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
import { Select2Size, Select2Variant, Select2Option } from "./types";
import { TagVariant } from "../Tag/types";
import { ContextMenu2NoResultsMessage } from "../ContextMenu2/ContextMenu2NoResultsMessage";
import { Select2OptionProps } from "./Select2Option";
import { Select2OptionGroupProps } from "./Select2OptionGroup";

type Select2Props = {
  value: (string | number) | (string | number)[];
  onChange: (value: (string | number) | (string | number)[]) => void;
  options?: Select2Option[];
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: Select2Size;
  variant?: Select2Variant;
  tagVariant?: TagVariant;
  searchable?: boolean;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  error?: boolean;
  applyButtonText?: string;
  cancelButtonText?: string;
  children?: React.ReactNode;
};

type GroupInfo = {
  label: string;
  options: Select2Option[];
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
  searchable = false,
  searchPlaceholder = "検索",
  noResultsMessage = "見つかりませんでした",
  error = false,
  applyButtonText = "適用",
  cancelButtonText = "キャンセル",
  onChange,
  children,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [tempSelectedValues, setTempSelectedValues] = useState<
    (string | number)[]
  >([]);
  const [isTagOverflowing, setIsTagOverflowing] = useState(false);
  const tagContainerRef = useRef<HTMLDivElement>(null);

  // タグのバリアントを自動的に設定
  // ユーザーが明示的に指定した場合はそれを優先、指定がなければ親コンポーネントのvariantに基づいて自動設定
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
    if (!searchable || !searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [options, searchValue, searchable]);

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
    () =>
      searchable ? (
        <StyledContextMenu2TextInputItem
          autoFocus
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
        />
      ) : null,
    [searchable, searchValue, searchPlaceholder, handleSearchChange],
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

  // コンポーネントの子要素からオプションを抽出
  const processChildren = () => {
    if (!children) return null;

    const result: ReactElement[] = [];
    let currentGroup: GroupInfo | null = null;

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;

      const childType = child.type as any;
      const displayName = childType.displayName;

      // Select2OptionGroup
      if (displayName === "Select2OptionGroup") {
        // 以前のグループがあればそれを追加
        if (currentGroup) {
          result.push(
            <ContextMenu2HeadingItem key={`group-${currentGroup.label}`}>
              {currentGroup.label}
            </ContextMenu2HeadingItem>
          );

          currentGroup.options.forEach((option) => {
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

            result.push(
              <ContextMenu2CheckItem
                key={option.value.toString()}
                checked={isChecked}
                closeOnChange={!multiple}
                disabled={option.disabled}
                tabIndex={0}
                onChange={handleChange}
              >
                {option.label}
              </ContextMenu2CheckItem>
            );
          });
        }

        // 新しいグループを開始
        currentGroup = {
          label: (child.props as Select2OptionGroupProps).label,
          options: [],
        };

        // グループ内の子要素を処理
        Children.forEach(child.props.children, (groupChild) => {
          if (
            isValidElement(groupChild) &&
            (groupChild.type as any).displayName === "Select2Option"
          ) {
            const { value, disabled, children } = groupChild.props as Select2OptionProps;
            currentGroup!.options.push({
              value,
              label: children as string,
              disabled,
            });
          }
        });
      }
      // Select2Option（ルートレベル）
      else if (displayName === "Select2Option") {
        // 以前のグループがあればそれを追加
        if (currentGroup) {
          result.push(
            <ContextMenu2HeadingItem key={`group-${currentGroup.label}`}>
              {currentGroup.label}
            </ContextMenu2HeadingItem>
          );

          currentGroup.options.forEach((option) => {
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

            result.push(
              <ContextMenu2CheckItem
                key={option.value.toString()}
                checked={isChecked}
                closeOnChange={!multiple}
                disabled={option.disabled}
                tabIndex={0}
                onChange={handleChange}
              >
                {option.label}
              </ContextMenu2CheckItem>
            );
          });
          currentGroup = null;
        }

        const { value: optionValue, disabled: optionDisabled, children: optionLabel } = child.props as Select2OptionProps;
        const option = {
          value: optionValue,
          label: optionLabel as string,
          disabled: optionDisabled,
        };

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

        result.push(
          <ContextMenu2CheckItem
            key={option.value.toString()}
            checked={isChecked}
            closeOnChange={!multiple}
            disabled={option.disabled}
            tabIndex={0}
            onChange={handleChange}
          >
            {option.label}
          </ContextMenu2CheckItem>
        );
      }
      // その他のContextMenu2アイテム（HeadingItem, SeparatorItemなど）
      else if (
        displayName === "ContextMenu2HeadingItem" ||
        displayName === "ContextMenu2SeparatorItem" ||
        displayName === "ContextMenu2HelpTextItem" ||
        displayName === "ContextMenu2ButtonItem"
      ) {
        // 以前のグループがあればそれを追加
        if (currentGroup) {
          result.push(
            <ContextMenu2HeadingItem key={`group-${currentGroup.label}`}>
              {currentGroup.label}
            </ContextMenu2HeadingItem>
          );

          currentGroup.options.forEach((option) => {
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

            result.push(
              <ContextMenu2CheckItem
                key={option.value.toString()}
                checked={isChecked}
                closeOnChange={!multiple}
                disabled={option.disabled}
                tabIndex={0}
                onChange={handleChange}
              >
                {option.label}
              </ContextMenu2CheckItem>
            );
          });
          currentGroup = null;
        }

        result.push(
          cloneElement(child as React.ReactElement<any>, {
            key: `custom-${result.length}`,
            "data-tabindex": 0,
          })
        );
      }
    });

    // 最後のグループを処理
    if (currentGroup) {
      result.push(
        <ContextMenu2HeadingItem key={`group-${currentGroup.label}`}>
          {currentGroup.label}
        </ContextMenu2HeadingItem>
      );

      currentGroup.options.forEach((option) => {
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

        result.push(
          <ContextMenu2CheckItem
            key={option.value.toString()}
            checked={isChecked}
            closeOnChange={!multiple}
            disabled={option.disabled}
            tabIndex={0}
            onChange={handleChange}
          >
            {option.label}
          </ContextMenu2CheckItem>
        );
      });
    }

    return result;
  };

  // コンポーネントの子要素または options から生成されたアイテム
  const menuItems = useMemo(() => {
    // コンポーネントベースAPIを優先
    if (children) {
      return processChildren();
    }

    // options配列を使用する従来のAPI
    if (filteredOptions.length > 0) {
      return filteredOptions.map((option) => {
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
            tabIndex={0}
            onChange={handleChange}
          >
            {option.label}
          </ContextMenu2CheckItem>
        );
      });
    }

    return <ContextMenu2NoResultsMessage message={noResultsMessage} />;
  }, [
    children,
    filteredOptions,
    multiple,
    tempSelectedValues,
    value,
    handleMultipleSelect,
    handleSingleSelect,
    noResultsMessage,
  ]);

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
            noResultsMessage={searchable ? noResultsMessage : undefined}
            open={isOpen}
            stickyFooter={stickyFooter}
            stickyHeader={stickyHeader}
            trigger={triggerElement}
            onOpenChange={handleOpenChange}
          >
            {menuItems}
          </ContextMenu2>
        </ContextMenu2Container>

        {multiple && (
          <InputArea>
            <TagContainer
              ref={tagContainerRef}
              onClick={handleTagContainerClick}
            >
              {selectedOptions.map((option) => {
                const handleRemove = () => handleTagRemove(option.value);
                const handleTagRemoveHandler = disabled
                  ? undefined
                  : handleRemove;
                return (
                  <StyledTag
                    key={option.value.toString()}
                    disabled={disabled}
                    label={option.label}
                    size={size}
                    variant={computedTagVariant}
                    onRemove={handleTagRemoveHandler}
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
