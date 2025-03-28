import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
  createContext,
} from "react";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import * as styled from "./styled";

export const FilterInputContext = createContext({
  isSmall: false,
});

//
// -----------------------------------------------------------------------------
type FilterTagProps = {
  label: string;
  onRemove: () => void;
};

export const FilterTag = ({ label, onRemove }: FilterTagProps) => {
  return (
    <styled.FilterTag>
      {label}
      <styled.FilterTagButton
        type="button"
        aria-label="削除"
        onClick={onRemove}
      >
        <Icon name="close_circle" type="fill" color="currentColor" />
      </styled.FilterTagButton>
    </styled.FilterTag>
  );
};

//
// -----------------------------------------------------------------------------

// 本体のコンポーネント
type FilterInputAbstractProps = {
  selectedIndex: number;
  selectOptions: { icon: ReactElement<any>; label: string }[];
  children?: ReactNode;
  onSelectChange: (index: number) => void;
};
export const FilterInputAbstract = ({
  selectedIndex,
  selectOptions,
  onSelectChange,
  children,
}: FilterInputAbstractProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  // 本来なら CSS Container Query で判定したいけれど、
  // styled-components v6 未満では未対応
  const [isSmall, setIsSmall] = useState(false);

  const el = useRef<HTMLDivElement>(null);

  const handleSelectChange = useCallback(
    (index: number) => {
      onSelectChange(index);
      setIsSelectOpen(false);
    },
    [onSelectChange, setIsSelectOpen],
  );

  useEffect(() => {
    if (!window.ResizeObserver) return;
    if (!el.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      if (!el.current) return;
      setIsSmall(el.current.clientWidth < 130);
    });

    resizeObserver.observe(el.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setIsSmall]);

  return (
    <styled.FilterInputAbstract ref={el} data-small={isSmall}>
      <ContextMenu2Container>
        <ContextMenu2
          open={isSelectOpen}
          trigger={
            <styled.DropDownTrigger
              type="button"
              aria-label="フィルターのタイプを選ぶ"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              {selectOptions[selectedIndex].icon}
              <Icon name="arrow_down" color="currentColor" />
            </styled.DropDownTrigger>
          }
          onOpenChange={(open) => setIsSelectOpen(open)}
        >
          {selectOptions.map(({ label, icon }, i) => (
            <ContextMenu2CheckItem
              key={label}
              prepend={icon}
              checked={selectedIndex === i}
              onChange={() => handleSelectChange(i)}
            >
              {label}
            </ContextMenu2CheckItem>
          ))}
        </ContextMenu2>
      </ContextMenu2Container>
      <FilterInputContext.Provider value={{ isSmall }}>
        {children}
      </FilterInputContext.Provider>
    </styled.FilterInputAbstract>
  );
};
