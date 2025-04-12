import React, { useEffect, useRef, useState, type ReactElement } from "react";
import { FilterInputAbstract } from "../FilterInputAbstract/FilterInputAbstract";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2ButtonItem,
} from "../ContextMenu2";
import Icon from "../Icon";
import * as styled from "./styled";
import { FilterSize } from "../FilterInputAbstract/types";

type FilterTagInputProps = {
  value: string;
  options: string[];
  selectedIndex: number;
  selectOptions: { icon: ReactElement; label: string }[];
  onChange: (value: string) => void;
  onSelectChange: (index: number) => void;
  size?: FilterSize;
};
export const FilterSelectInput = ({
  value,
  options: values,
  selectedIndex,
  selectOptions,
  onChange,
  onSelectChange,
  size = "medium",
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
      size={size}
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
                <styled.SelectLabel $size={size}>{value}</styled.SelectLabel>
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
