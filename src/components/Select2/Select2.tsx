import React, { useCallback, useMemo, useState } from "react";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2CheckItem,
  ContextMenu2Container,
} from "../ContextMenu2";
import {
  SelectContainer,
  SelectButton,
  InputArea,
  SelectLabel,
  Placeholder,
  IconArea,
  StyledSearchInput,
  OptionsContainer,
  ErrorMessage,
  Description,
  Label,
} from "./styled";
import { Select2Props, Select2Option } from "./types";

export const Select2 = <T extends string | number>({
  options = [],
  value,
  onChange,
  disabled = false,
  placeholder = "選択してください",
  size = "medium",
  variant = "default",
  searchable = false,
  searchPlaceholder = "検索...",
  className,
  error = false,
  errorMessage,
  required = false,
  label,
  description,
  maxMenuHeight,
  minMenuWidth,
  maxMenuWidth,
  noOptionsMessage = "オプションがありません",
  ...rest
}: Select2Props<T>) => {
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

  const handleSelect = useCallback(
    (option: Select2Option<T>) => {
      if (!option.disabled) {
        onChange?.(option.value);
        setIsOpen(false);
      }
    },
    [onChange]
  );

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchable, searchValue]);

  return (
    <SelectContainer className={className}>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </Label>
      )}
      <ContextMenu2Container>
        <ContextMenu2
          open={isOpen}
          onOpenChange={handleOpenChange}
          minWidth={minMenuWidth}
          maxWidth={maxMenuWidth}
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
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-invalid={error}
              aria-required={required}
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
              <IconArea>
                <Icon name={isOpen ? "arrow_up" : "arrow_down"} size="md" />
              </IconArea>
            </SelectButton>
          }
        >
          <>
            {searchable && (
              <StyledSearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                autoFocus
              />
            )}
            <OptionsContainer $maxHeight={maxMenuHeight}>
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
                  {noOptionsMessage}
                </ContextMenu2CheckItem>
              )}
            </OptionsContainer>
          </>
        </ContextMenu2>
      </ContextMenu2Container>
      {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {description && <Description>{description}</Description>}
    </SelectContainer>
  );
}; 