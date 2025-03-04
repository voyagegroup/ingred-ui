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
  ContextMenu2TextInputItem,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import Icon from "../Icon";
import * as styled from "./styled";

type FilterTagInputProps = {
  values: string[];
  options: (string | string[])[];
  selectedIndex: number;
  selectOptions: { icon: ReactElement; label: string }[];
  onChange: (values: string[]) => void;
  onSelectChange: (index: number) => void;
};
export const FilterComboBox = ({
  values,
  options,
  selectedIndex,
  selectOptions,
  onChange,
  onSelectChange,
}: FilterTagInputProps) => {
  const [userValue, setUserValue] = useState("");
  const [userEnteredValue, setUserEnteredValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // タグリスト部分で、CSS の overflow が発生しているか否か
  const [isInlineOverflowing, setIsInlineOverflowing] = useState(false);
  const inlineFieldEl = useRef<HTMLDivElement>(null);
  // inlineFieldEl の大きさを監視して、
  // overflow したら isInlineOverflowing を true にする
  const checkInlineOverflow = useCallback(() => {
    if (!inlineFieldEl.current) return;

    setIsInlineOverflowing(
      inlineFieldEl.current.clientWidth < inlineFieldEl.current.scrollWidth,
    );
  }, []);

  // userValue の入力状況に応じてフィルターされた options。
  // ただし、options は string | string[] なので、フィルターのついでに string[] に統一する。
  const getFilteredOptions = useCallback(
    (value: string) => {
      const trimmedValue = value.trim();
      const filtered = options.filter((option) => {
        if (!Array.isArray(option)) return option.includes(trimmedValue);
        return option.some((o) => o.includes(trimmedValue));
      });
      const normalized = (filtered.length === 0 ? options : filtered).map(
        (option) => {
          return !Array.isArray(option) ? [option] : option;
        },
      );
      return normalized;
    },
    [options],
  );

  const filteredOptions = useMemo(() => {
    return getFilteredOptions(userEnteredValue);
  }, [userEnteredValue, getFilteredOptions]);

  const handleSelect = useCallback(
    (value: string) => {
      if (values.includes(value)) {
        onChange(values.filter((v) => v !== value));
      } else {
        onChange([...values, value]);
      }
    },
    [values, onChange],
  );

  const handleEnter = useCallback(() => {
    if (isComposing) return;
    setUserEnteredValue(userValue);
    if (!userValue.trim()) return;

    const filteredOptions = getFilteredOptions(userEnteredValue);

    if (filteredOptions.length !== 1) return;
    handleSelect(filteredOptions[0][0]);
  }, [
    isComposing,
    userValue,
    userEnteredValue,
    getFilteredOptions,
    handleSelect,
  ]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserValue(event.target.value);
      if (!isComposing) setUserEnteredValue(event.target.value);
    },
    [isComposing, setUserValue, setUserEnteredValue],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setUserEnteredValue(userValue);
        return;
      }
    },
    [userValue, setUserEnteredValue],
  );

  const handleRemove = useCallback(
    (value: string) => {
      onChange(values.filter((v) => v !== value));
    },
    [values, onChange],
  );

  const handleOpenChange = useCallback(() => {
    setUserValue("");
    setUserEnteredValue("");
  }, [setUserValue, setUserEnteredValue]);

  useEffect(() => {
    if (!window.ResizeObserver) return;
    if (!inlineFieldEl.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      if (!inlineFieldEl.current) return;
      checkInlineOverflow();
    });

    resizeObserver.observe(inlineFieldEl.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkInlineOverflow]);

  return (
    <FilterInputAbstract
      selectedIndex={selectedIndex}
      selectOptions={selectOptions}
      onSelectChange={onSelectChange}
    >
      <styled.SelectContainer data-overflowing={isInlineOverflowing}>
        <ContextMenu2Container>
          <ContextMenu2
            trigger={
              <styled.Select type="button">
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
              onEnter={handleEnter}
            />
            {filteredOptions.map((option) => (
              <ContextMenu2CheckItem
                key={option[0]}
                checked={values.includes(option[0])}
                onChange={() => handleSelect(option[0])}
              >
                {option[0]}
              </ContextMenu2CheckItem>
            ))}
          </ContextMenu2>
        </ContextMenu2Container>
        <styled.TagList ref={inlineFieldEl}>
          {values.map((value) => (
            <FilterTag
              key={value}
              label={value}
              onRemove={() => handleRemove(value)}
            />
          ))}
        </styled.TagList>
      </styled.SelectContainer>
    </FilterInputAbstract>
  );
};
