import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  Children,
  isValidElement,
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
import { Select2Props, Select2Option } from "./types";
import { ContextMenu2NoResultsMessage } from "../ContextMenu2/ContextMenu2NoResultsMessage";

export const Select2: React.FC<Select2Props> = ({
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
  children,
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

  // タグのバリアントを自動的に設定
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

  // 子要素からオプション情報を抽出する
  const extractOptionsFromChildren = useMemo(() => {
    if (!children) return [];
    const options: Select2Option[] = [];
    const extractOptions = (childElements: React.ReactNode) => {
      Children.forEach(childElements, (child) => {
        if (!isValidElement(child)) return;
        const childElement = child as ReactElement;
        if (childElement.type && typeof childElement.type !== "string") {
          const componentName =
            (childElement.type as any).displayName ||
            (childElement.type as any).name;
          if (componentName === "Select2Option") {
            const optionValue = childElement.props.value;
            const optionLabel = childElement.props.children;
            const optionDisabled = !!childElement.props.disabled;
            if (optionValue !== undefined) {
              options.push({
                value: optionValue,
                label: String(optionLabel),
                disabled: optionDisabled,
              });
            }
          } else if (componentName === "Select2OptionGroup") {
            if (childElement.props.children) {
              extractOptions(childElement.props.children);
            }
          }
        }
      });
    };
    extractOptions(children);
    return options;
  }, [children]);

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
    () => extractOptionsFromChildren.find((option) => option.value === value),
    [extractOptionsFromChildren, value],
  );

  const selectedOptions = useMemo(() => {
    if (!multiple || !Array.isArray(value)) return [];
    return extractOptionsFromChildren.filter((option) =>
      value.includes(option.value),
    );
  }, [multiple, extractOptionsFromChildren, value]);

  // 検索機能用: 子要素から抽出したoptionsをフィルタリング
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchValue) return extractOptionsFromChildren;
    return extractOptionsFromChildren.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [extractOptionsFromChildren, searchValue, searchable]);

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

  // 宣言的APIでの子要素をContextMenu2の項目に変換
  const renderChildrenAsMenuItems = (
    childrenElements: React.ReactNode,
  ): React.ReactNode[] => {
    // 型定義
    type OptionGroup = {
      label: string;
      options: ReactElement[];
    };

    const items: React.ReactNode[] = [];
    let currentGroup: OptionGroup | null = null;

    // 子要素からSelect2Option要素を抽出してCheckItemに変換する関数
    const convertOptionToCheckItem = (
      option: ReactElement,
      keyPrefix: string,
      index: number,
    ): ReactElement => {
      const optionValue = option.props.value;
      const optionDisabled = !!option.props.disabled;
      const optionLabel = option.props.children;

      const isChecked = multiple
        ? tempSelectedValues.includes(optionValue)
        : optionValue === value;

      const handleChange = () => {
        if (multiple) {
          handleMultipleSelect(!isChecked, {
            value: optionValue,
            label: String(optionLabel),
            disabled: optionDisabled,
          });
        } else {
          handleSingleSelect({
            value: optionValue,
            label: String(optionLabel),
            disabled: optionDisabled,
          });
        }
      };

      return (
        <ContextMenu2CheckItem
          key={`${keyPrefix}-${index}`}
          checked={isChecked}
          closeOnChange={!multiple}
          disabled={optionDisabled}
          tabIndex={0}
          onChange={handleChange}
        >
          {optionLabel}
        </ContextMenu2CheckItem>
      );
    };

    // 現在のグループをrender
    const renderCurrentGroup = () => {
      if (currentGroup === null) return;

      const group = currentGroup; // ローカル変数にコピーして型を安定させる

      items.push(
        <ContextMenu2HeadingItem key={`heading-${group.label}`}>
          {group.label}
        </ContextMenu2HeadingItem>,
      );

      group.options.forEach((option, index) => {
        items.push(
          convertOptionToCheckItem(option, `option-${group.label}`, index),
        );
      });
    };

    // 子要素を走査して構造データを構築
    Children.forEach(childrenElements, (child) => {
      if (!isValidElement(child)) return;

      const childElement = child as ReactElement;

      if (childElement.type && typeof childElement.type !== "string") {
        const componentName =
          (childElement.type as any).displayName ||
          (childElement.type as any).name;

        // Select2OptionGroupの場合
        if (componentName === "Select2OptionGroup") {
          // 既存のグループを追加
          if (currentGroup !== null) {
            renderCurrentGroup();
          }

          // 新しいグループを開始
          currentGroup = {
            label: childElement.props.label as string,
            options: [],
          };

          // グループの子要素を処理
          if (childElement.props.children) {
            Children.forEach(childElement.props.children, (groupChild) => {
              if (isValidElement(groupChild)) {
                const groupChildElement = groupChild as ReactElement;
                const groupChildName =
                  (groupChildElement.type as any).displayName ||
                  (groupChildElement.type as any).name;

                if (
                  groupChildName === "Select2Option" &&
                  currentGroup !== null
                ) {
                  currentGroup.options.push(groupChildElement);
                }
              }
            });
          }
        }
        // Select2Separatorの場合
        else if (componentName === "Select2Separator") {
          items.push(
            <ContextMenu2SeparatorItem key={`separator-${items.length}`} />,
          );
        }
        // Select2Optionの場合
        else if (componentName === "Select2Option") {
          if (currentGroup !== null) {
            currentGroup.options.push(childElement);
          } else {
            const optionValue = childElement.props.value;
            if (optionValue === undefined) return;

            items.push(
              convertOptionToCheckItem(childElement, `option`, items.length),
            );
          }
        }
        // その他のコンポーネントはそのまま追加
        else {
          items.push(childElement);
        }
      }
    });

    // 最後のグループを追加
    if (currentGroup !== null) {
      renderCurrentGroup();
    }

    return items;
  };

  // 子要素を処理する関数
  const renderMenuContent = () => {
    // 子要素があればそれを処理
    if (children) {
      // 宣言的APIの子要素を処理してメニュー項目を生成
      return renderChildrenAsMenuItems(children);
    }

    // 子要素がない場合は従来通りoptionsからリストを生成
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
  };

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
            {renderMenuContent()}
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
