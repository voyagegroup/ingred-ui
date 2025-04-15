import React, { useCallback, useMemo, useState } from "react";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2CheckItem,
  ContextMenu2Container,
} from "../ContextMenu2";
import {
  Select2Container,
  SelectButton,
  InputArea,
  SelectLabel,
  Placeholder,
  IconArea,
  StyledContextMenu2TextInputItem,
  ErrorMessage,
} from "./styled";
import { Select2Props, Select2Option } from "./types";

export const Select2 = ({
  options = [],
  value,
  onChange,
  disabled = false,
  placeholder = "選択してください",
  size = "medium",
  variant = "light",
  searchPlaceholder = "検索",
  noResultsMessage = "見つかりませんでした",
  error = false,
  errorMessage,
  ...rest
}: Select2Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!disabled) {
        setIsOpen(open);
        if (!open) {
          setSearchValue("");
        }
      }
    },
    [disabled]
  );

  // リスト絞り込みのキーワードをクリア
  const handleSelect = useCallback(
    (option: Select2Option) => {
      if (!option.disabled) {
        onChange?.(option.value);
        setIsOpen(false);
        setSearchValue("");
      }
    },
    [onChange]
  );

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  return (
    <Select2Container>
      <ContextMenu2Container>
        <ContextMenu2
          open={isOpen}
          onOpenChange={handleOpenChange}
          trigger={
            <SelectButton
              type="button"
              $size={size}
              $variant={variant}
              $error={error}
              $disabled={disabled}
              $isOpen={isOpen}
              $hasValue={!!selectedOption}
              disabled={disabled}
              role="listbox"
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-invalid={error}
              {...rest}
            >
              <InputArea $size={size} $variant={variant} $disabled={disabled}>
                <SelectLabel>
                  {selectedOption ? (
                    selectedOption.label
                  ) : (
                    <Placeholder $variant={variant}>
                      {placeholder}
                    </Placeholder>
                  )}
                </SelectLabel>
              </InputArea>
              <IconArea $size={size}>
                <Icon name="arrow_down" color="currentColor" />
              </IconArea>
            </SelectButton>
          }
        >
          <StyledContextMenu2TextInputItem
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchPlaceholder}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <ContextMenu2CheckItem
                key={option.value.toString()}
                checked={option.value === value}
                onChange={() => handleSelect(option)}
                disabled={option.disabled}
              >
                {option.label}
              </ContextMenu2CheckItem>
            ))
          ) : (
            <ContextMenu2CheckItem disabled>
              {noResultsMessage}
            </ContextMenu2CheckItem>
          )}
        </ContextMenu2>
      </ContextMenu2Container>
      {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Select2Container>
  );
}; 