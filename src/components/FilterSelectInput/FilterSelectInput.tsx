import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { FilterInputAbstract } from "../FilterInputAbstract/FilterInputAbstract";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import Icon from "../Icon";
import * as styled from "./styled";
import { FilterSize, FilterVariant } from "../FilterInputAbstract/types";
import { ContextMenu2NoResultsMessage } from "../ContextMenu2/ContextMenu2NoResultsMessage";

type FilterSelectInputProps = {
  value: string;
  options: string[];
  selectedIndex: number;
  selectOptions: { icon: React.ReactElement; label: string }[];
  onChange: (value: string) => void;
  onSelectChange: (index: number) => void;
  size?: FilterSize;
  variant?: FilterVariant;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  disabled?: boolean;
  error?: boolean;
};

export const FilterSelectInput = ({
  value,
  options,
  selectedIndex,
  selectOptions,
  onChange,
  onSelectChange,
  size = "medium",
  variant = "dark",
  searchPlaceholder = "絞り込む",
  noResultsMessage = "見つかりませんでした",
  disabled = false,
  error = false,
}: FilterSelectInputProps) => {
  const [width, setWidth] = useState(0);
  const [userValue, setUserValue] = useState("");
  const [userEnteredValue, setUserEnteredValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const triggerEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.ResizeObserver) return;
    if (!triggerEl.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      triggerEl.current && setWidth(triggerEl.current.offsetWidth);
    });

    resizeObserver.observe(triggerEl.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // userValueの入力状況に応じてフィルターされたoptions
  const filteredOptions = useMemo(() => {
    const trimmedValue = userEnteredValue.trim();
    if (trimmedValue === "") return options;
    return options.filter((option: string) => option.includes(trimmedValue));
  }, [options, userEnteredValue]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserValue(event.target.value);
      if (!isComposing) setUserEnteredValue(event.target.value);
    },
    [isComposing],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setUserEnteredValue(userValue);
        return;
      }
    },
    [userValue],
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setUserValue("");
      setUserEnteredValue("");
    }
  }, []);

  const handleOptionClick = useCallback(
    (selectedValue: string) => {
      onChange(selectedValue);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleSelectClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  }, [disabled, isOpen]);

  const handleMenuOpenChange = useCallback(
    (open: boolean) => {
      if (!disabled) {
        handleOpenChange(open);
      }
    },
    [disabled, handleOpenChange],
  );

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
      <styled.SelectContainer ref={triggerEl}>
        <ContextMenu2Container>
          <ContextMenu2
            open={isOpen && !disabled}
            minWidth={width}
            trigger={
              <styled.Select
                type="button"
                $size={size}
                $variant={variant}
                disabled={disabled}
                onClick={handleSelectClick}
              >
                <styled.SelectLabel $size={size}>{value}</styled.SelectLabel>
                <styled.SelectIcon>
                  <Icon name="arrow_down" color="currentColor" />
                </styled.SelectIcon>
              </styled.Select>
            }
            onOpenChange={handleMenuOpenChange}
          >
            <styled.StyledContextMenu2TextInputItem
              autoFocus
              value={userValue}
              placeholder={searchPlaceholder}
              disabled={disabled}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
            {filteredOptions.length > 0 ? (
              filteredOptions.map((v) => (
                <ContextMenu2CheckItem
                  key={v}
                  checked={v === value}
                  disabled={disabled}
                  onChange={() => handleOptionClick(v)}
                >
                  {v}
                </ContextMenu2CheckItem>
              ))
            ) : (
              <ContextMenu2NoResultsMessage message={noResultsMessage} />
            )}
          </ContextMenu2>
        </ContextMenu2Container>
      </styled.SelectContainer>
    </FilterInputAbstract>
  );
};
