import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ReactElement,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { FilterInputAbstract } from "../FilterInputAbstract/FilterInputAbstract";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2ButtonItem,
  ContextMenu2TextInputItem,
} from "../ContextMenu2";
import Icon from "../Icon";
import * as styled from "./styled";
import { FilterSize, FilterVariant } from "../FilterInputAbstract/styled";

type FilterTagInputProps = {
  value: string;
  options: string[];
  selectedIndex: number;
  selectOptions: { icon: ReactElement; label: string }[];
  onChange: (value: string) => void;
  onSelectChange: (index: number) => void;
  size?: FilterSize;
  variant?: FilterVariant;
};

export const FilterSelectInput = ({
  value,
  options: values,
  selectedIndex,
  selectOptions,
  onChange,
  onSelectChange,
  size = "medium",
  variant = "dark",
}: FilterTagInputProps) => {
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
    if (trimmedValue === "") return values;
    return values.filter((option) => option.includes(trimmedValue));
  }, [values, userEnteredValue]);

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

  return (
    <FilterInputAbstract
      size={size}
      selectedIndex={selectedIndex}
      selectOptions={selectOptions}
      onSelectChange={onSelectChange}
    >
      <styled.SelectContainer ref={triggerEl}>
        <ContextMenu2Container>
          <ContextMenu2
            open={isOpen}
            minWidth={width}
            trigger={
              <styled.Select type="button" $size={size} $variant={variant}>
                <styled.SelectLabel $size={size}>{value}</styled.SelectLabel>
                <styled.SelectIcon>
                  <Icon name="arrow_down" color="currentColor" />
                </styled.SelectIcon>
              </styled.Select>
            }
            onOpenChange={handleOpenChange}
          >
            <ContextMenu2TextInputItem
              autoFocus
              value={userValue}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
            {filteredOptions.map((v) => (
              <ContextMenu2ButtonItem
                key={v}
                closeOnClick
                pressed={v === value}
                onClick={() => handleOptionClick(v)}
              >
                {v}
              </ContextMenu2ButtonItem>
            ))}
          </ContextMenu2>
        </ContextMenu2Container>
      </styled.SelectContainer>
    </FilterInputAbstract>
  );
};
