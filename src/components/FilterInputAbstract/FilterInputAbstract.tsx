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
import type { Props as IconProps } from "../Icon/Icon";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import * as styled from "./styled";
import { FilterSize, FilterVariant } from "./types";
import { Tag } from "../Tag";

export const FilterInputContext = createContext({
  isSmall: false,
  disabled: false,
});

//
// -----------------------------------------------------------------------------
type FilterTagProps = {
  label: string;
  onRemove: () => void;
  size?: FilterSize;
  variant?: "light" | "dark";
};

export const FilterTag = ({
  label,
  size = "medium",
  variant = "dark",
  onRemove,
}: FilterTagProps) => {
  const { disabled } = React.useContext(FilterInputContext);
  const handleRemove = disabled ? undefined : onRemove;
  return (
    <Tag
      label={label}
      size={size}
      variant={variant}
      disabled={disabled}
      onRemove={handleRemove}
    />
  );
};

//
// -----------------------------------------------------------------------------

// 本体のコンポーネント
type FilterInputAbstractProps = {
  selectedIndex: number;
  selectOptions: { icon: ReactElement<IconProps>; label: string }[];
  children?: ReactNode;
  onSelectChange: (index: number) => void;
  size?: "small" | "medium" | "large";
  variant?: FilterVariant;
  disabled?: boolean;
  error?: boolean;
  isOpen?: boolean;
};
export const FilterInputAbstract = ({
  selectedIndex,
  selectOptions,
  onSelectChange,
  children,
  size = "medium",
  variant = "light",
  disabled = false,
  error = false,
  isOpen = false,
}: FilterInputAbstractProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  // 本来なら CSS Container Query で判定したいけれど、
  // styled-components v6 未満では未対応
  const [isSmall, setIsSmall] = useState(false);

  const el = useRef<HTMLDivElement>(null);

  // selectOptionsのiconにデフォルトでcurrentColorを設定
  const selectOptionsWithColor = selectOptions.map((option) => ({
    ...option,
    icon:
      React.isValidElement(option.icon) && option.icon.type === Icon
        ? React.cloneElement(option.icon as ReactElement<IconProps>, {
            color: option.icon.props.color || "currentColor",
          })
        : option.icon,
  }));

  const handleSelectChange = useCallback(
    (index: number) => {
      onSelectChange(index);
      setIsSelectOpen(false);
    },
    [onSelectChange, setIsSelectOpen],
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    setIsSelectOpen(!isSelectOpen);
  }, [disabled, isSelectOpen, setIsSelectOpen]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!disabled) {
        setIsSelectOpen(open);
      }
    },
    [disabled, setIsSelectOpen],
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
    <styled.FilterInputAbstract
      ref={el}
      data-small={isSmall}
      data-size={size}
      data-disabled={disabled}
      $isOpen={isOpen}
      $error={error}
      $disabled={disabled}
    >
      <ContextMenu2Container>
        <ContextMenu2
          open={disabled ? false : isSelectOpen}
          trigger={
            <styled.DropDownTrigger
              $variant={variant}
              type="button"
              disabled={disabled}
              aria-label="フィルターのタイプを選ぶ"
              onClick={handleClick}
            >
              {selectOptionsWithColor[selectedIndex].icon}
              <Icon name="arrow_down" color="currentColor" />
            </styled.DropDownTrigger>
          }
          onOpenChange={handleOpenChange}
        >
          {selectOptionsWithColor.map(({ label, icon }, i) => (
            <ContextMenu2CheckItem
              key={label}
              prepend={icon}
              checked={selectedIndex === i}
              disabled={disabled}
              onChange={() => handleSelectChange(i)}
            >
              {label}
            </ContextMenu2CheckItem>
          ))}
        </ContextMenu2>
      </ContextMenu2Container>
      <FilterInputContext.Provider value={{ isSmall, disabled }}>
        {children}
      </FilterInputContext.Provider>
    </styled.FilterInputAbstract>
  );
};
