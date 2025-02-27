import React, { useEffect, useRef, useState, type ReactElement } from "react";
import { FilterInputAbstract } from "../FilterInputAbstract/FilterInputAbstract";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2ButtonItem,
} from "../ContextMenu2";
import Icon from "../Icon";
import * as styled from "./styled";

type FilterTagInputProps = {
  value: string;
  values: string[];
  selectedIndex: number;
  selectOptions: { icon: ReactElement; label: string }[];
  onChange: (value: string) => void;
  onSelectChange: (index: number) => void;
};
export const FilterSelectInput = ({
  value,
  values,
  selectedIndex,
  selectOptions,
  onChange,
  onSelectChange,
}: FilterTagInputProps) => {
  const [width, setWidth] = useState(0);
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

  return (
    <FilterInputAbstract
      selectedIndex={selectedIndex}
      selectOptions={selectOptions}
      onSelectChange={onSelectChange}
    >
      <styled.SelectContainer ref={triggerEl}>
        <ContextMenu2Container>
          <ContextMenu2
            minWidth={width}
            trigger={
              <styled.Select type="button">
                <styled.SelectLabel>{value}</styled.SelectLabel>
                <styled.SelectIcon>
                  <Icon name="arrow_down" color="currentColor" />
                </styled.SelectIcon>
              </styled.Select>
            }
          >
            {values.map((v) => (
              <ContextMenu2ButtonItem
                key={v}
                closeOnClick
                pressed={v === value}
                onClick={() => onChange(v)}
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
