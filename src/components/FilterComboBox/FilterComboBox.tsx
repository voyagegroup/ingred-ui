import React, {
  useState,
  useMemo,
  type ReactElement,
  useCallback,
} from "react";
import { FilterInputAbstract } from "../FilterInputAbstract/FilterInputAbstract";
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

  // userValue の入力状況に応じてフィルターされた options。
  // ただし、options は string | string[] なので、フィルターのついでに string[] に統一する。
  const filteredOptions = useMemo(() => {
    const filtered = options.filter((option) => {
      if (!Array.isArray(option)) return option.includes(userValue);
      return option.some((o) => o.includes(userValue));
    });
    const normalized = filtered.map((option) => {
      return !Array.isArray(option) ? [option] : option;
    });
    return normalized;
  }, [userValue, options]);

  const handleSelect = useCallback(
    (value: string) => {
      if (values.includes(value)) {
        onChange(values.filter((v) => v !== value));
      } else {
        onChange([...values, value]);
      }
    },
    [onChange, values],
  );

  const handleEnter = useCallback(() => {
    if (!userValue.trim()) return;
    if (filteredOptions.length !== 1) return;
    handleSelect(filteredOptions[0][0]);
  }, [userValue, filteredOptions, handleSelect]);

  return (
    <FilterInputAbstract
      selectedIndex={selectedIndex}
      selectOptions={selectOptions}
      onSelectChange={onSelectChange}
    >
      <styled.SelectContainer>
        <ContextMenu2Container>
          <ContextMenu2
            trigger={
              <styled.Select type="button">
                <styled.SelectIcon>
                  <Icon name="arrow_down" color="currentColor" />
                </styled.SelectIcon>
              </styled.Select>
            }
          >
            <ContextMenu2TextInputItem
              autoFocus
              value={userValue}
              onChange={(e) => setUserValue(e.target.value)}
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

        <styled.TagList>{values.join()}</styled.TagList>
      </styled.SelectContainer>
    </FilterInputAbstract>
  );
};
