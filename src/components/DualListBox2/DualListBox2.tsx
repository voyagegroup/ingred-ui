import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  createContext,
  isValidElement,
  Fragment,
  Children,
  type ReactNode,
  type ChangeEvent,
  type CSSProperties,
} from "react";
import Button from "../Button";
import Icon from "../Icon";
import * as styled from "./styled";
import { colors } from "../../styles";
import { ContextMenu2, ContextMenu2Container } from "../ContextMenu2";

export type Item = {
  id: string;
  groupName?: string;
  label: string;
};

const DualListBox2Context = createContext<{
  filterWords: string[];
  includedIds: string[];
  excludedIds: string[];
  onIncludedChange: (includedIds: string[]) => void;
  onExcludedChange: (excludedIds: string[]) => void;
}>({
  filterWords: [],
  includedIds: [],
  excludedIds: [],
  onIncludedChange: (_) => {},
  onExcludedChange: (_) => {},
});

const DualListBox2GroupContext = createContext<{
  groupName: string;
}>({ groupName: "" });

type DualListBox2ItemProps = {
  id: string;
  children: ReactNode;
};

export const DualListBox2Item = ({ id, children }: DualListBox2ItemProps) => {
  const {
    filterWords,
    includedIds,
    excludedIds,
    onIncludedChange,
    onExcludedChange,
  } = useContext(DualListBox2Context);

  const isIncluded = useMemo(() => includedIds.includes(id), [includedIds, id]);
  const isExcluded = useMemo(() => excludedIds.includes(id), [excludedIds, id]);

  const handleAddButtonClick = useCallback(() => {
    const newIncludedIds = isIncluded
      ? includedIds.filter((item) => item !== id)
      : [...includedIds, id];
    onIncludedChange(newIncludedIds);
    if (isExcluded) onExcludedChange(excludedIds.filter((item) => item !== id));
  }, [
    id,
    includedIds,
    excludedIds,
    isIncluded,
    isExcluded,
    onIncludedChange,
    onExcludedChange,
  ]);
  const handleExcludeButtonClick = useCallback(() => {
    const newExcludedIds = isExcluded
      ? excludedIds.filter((item) => item !== id)
      : [...excludedIds, id];
    onExcludedChange(newExcludedIds);
    if (isIncluded) onIncludedChange(includedIds.filter((item) => item !== id));
  }, [
    id,
    includedIds,
    excludedIds,
    isIncluded,
    isExcluded,
    onIncludedChange,
    onExcludedChange,
  ]);

  const contentsText = children?.toString();

  if (
    !!contentsText &&
    !!filterWords.length &&
    !filterWords.some((word) => contentsText.includes(word))
  ) {
    return null;
  }

  return (
    <styled.DualListBox2Item>
      <div>{children}</div>
      <styled.ItemActions>
        <li>
          <button
            type="button"
            style={{ "--color": colors.blue[500] } as CSSProperties}
            aria-label="追加"
            aria-pressed={isIncluded}
            onClick={handleAddButtonClick}
          >
            <Icon name="check_thin" color="currentColor" />
          </button>
        </li>
        <li>
          <button
            type="button"
            style={{ "--color": colors.red[500] } as CSSProperties}
            aria-label="除外"
            aria-pressed={isExcluded}
            onClick={handleExcludeButtonClick}
          >
            <Icon name="forbid" color="currentColor" />
          </button>
        </li>
      </styled.ItemActions>
    </styled.DualListBox2Item>
  );
};
DualListBox2Item.displayName = "DualListBox2Item";

//
const traverseChildren = (
  children: ReactNode,
  callback: (child: ReactNode) => void,
): void => {
  Children.forEach(children, (child) => {
    callback(child);
    if (!isValidElement(child) || !child.props.children) return;
    traverseChildren(child.props.children, callback);
  });
};

const getAllIds = (children: ReactNode) => {
  const allIds: string[] = [];
  traverseChildren(children, (child) => {
    if (
      isValidElement(child) &&
      typeof child.type !== "string" &&
      "displayName" in child.type &&
      child.type.displayName === DualListBox2Item.displayName
    )
      allIds.push(child.props.id);
  });
  return allIds;
};
///

type DualListBox2AccordionProps = {
  label: string;
  children: ReactNode;
};

export const DualListBox2Accordion = ({
  label,
  children,
}: DualListBox2AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const { includedIds, excludedIds, onIncludedChange, onExcludedChange } =
    useContext(DualListBox2Context);

  const allIds = useMemo(() => getAllIds(children), [children]);

  const handleIncludeAllButtonClick = useCallback(() => {
    // すでにアコーディオン内が全選択されていたら、それらを解除する
    if (allIds.every((id) => includedIds.includes(id))) {
      onIncludedChange(includedIds.filter((id) => !allIds.includes(id)));
      return;
    }
    onIncludedChange(Array.from(new Set([...includedIds, ...allIds])));
    onExcludedChange(excludedIds.filter((id) => !allIds.includes(id)));
  }, [allIds, includedIds, excludedIds, onIncludedChange, onExcludedChange]);

  const handleExcludeAllButtonClick = useCallback(() => {
    // すでにアコーディオン内が全選択されていたら、それらを解除する
    if (allIds.every((id) => excludedIds.includes(id))) {
      onExcludedChange(excludedIds.filter((id) => !allIds.includes(id)));
      return;
    }
    onExcludedChange(Array.from(new Set([...excludedIds, ...allIds])));
    onIncludedChange(includedIds.filter((id) => !allIds.includes(id)));
  }, [allIds, includedIds, excludedIds, onIncludedChange, onExcludedChange]);

  return (
    <DualListBox2GroupContext.Provider value={{ groupName: label }}>
      <styled.AccordionHeader>
        <styled.AccordionButton
          type="button"
          aria-label={`${label}を開く`}
          aria-expanded={isOpen}
          onClick={handleButtonClick}
        >
          {label}
        </styled.AccordionButton>
        <styled.AccordionActionButtons>
          <li>
            <button
              type="button"
              aria-label="追加"
              onClick={handleIncludeAllButtonClick}
            >
              <Icon name="check_thin" color={colors.blue[500]} />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="除外"
              onClick={handleExcludeAllButtonClick}
            >
              <Icon name="forbid" color={colors.red[500]} />
            </button>
          </li>
        </styled.AccordionActionButtons>
        <styled.AccordionIcon>
          <Icon name="arrow_down" color={colors.basic[900]} />
        </styled.AccordionIcon>
      </styled.AccordionHeader>
      {isOpen && children}
    </DualListBox2GroupContext.Provider>
  );
};

type DualListBox2SectionProps = DualListBox2AccordionProps;

export const DualListBox2Section = ({
  label,
  children,
}: DualListBox2SectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);
  return (
    <DualListBox2GroupContext.Provider value={{ groupName: label }}>
      <styled.SectionButton
        type="button"
        aria-label={`${label}を開く`}
        aria-expanded={isOpen}
        onClick={handleButtonClick}
      >
        <styled.SectionButtonBefore>
          <Icon name="arrow_left" color={colors.basic[900]} />
        </styled.SectionButtonBefore>
        <div>{label}</div>
        <styled.SectionButtonAfter>
          <Icon name="arrow_right" color={colors.basic[900]} />
        </styled.SectionButtonAfter>
      </styled.SectionButton>
      {isOpen && children}
    </DualListBox2GroupContext.Provider>
  );
};
//

const DualListBox2SelectedItem = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { includedIds, excludedIds, onIncludedChange, onExcludedChange } =
    useContext(DualListBox2Context);
  const isIncluded = useMemo(() => includedIds.includes(id), [includedIds, id]);
  const isExcluded = useMemo(() => excludedIds.includes(id), [excludedIds, id]);
  const cancel = () => {
    if (isIncluded) {
      onIncludedChange(includedIds.filter((i) => i !== id));
    }
    if (isExcluded) {
      onExcludedChange(excludedIds.filter((i) => i !== id));
    }
  };
  const handleCancelButtonClick = cancel;

  return (
    <styled.DualListBox2SelectedItem>
      {children}
      <button
        type="button"
        aria-label="解除"
        onClick={handleCancelButtonClick}
      />
    </styled.DualListBox2SelectedItem>
  );
};

const DualListBox2SelectedLabel = ({ label }: { label: string }) => {
  return (
    <styled.DualListBox2SelectedLabel>{label}</styled.DualListBox2SelectedLabel>
  );
};

type DualListBox2Props = {
  included: Item[];
  excluded: Item[];
  menuButtons?: ReactNode;
  children: ReactNode;
  onIncludedChange: (includedIds: string[]) => void;
  onExcludedChange: (excludedIds: string[]) => void;
  onLoadMore?: () => void;
};

const toGrouped = (items: Item[]) => {
  return items.reduce(
    (
      acc: {
        groupName?: string;
        items: Pick<Item, "id" | "label">[];
      }[],
      item,
    ) => {
      const group = acc.find((group) => group.groupName === item.groupName);
      if (group) {
        group.items.push({ id: item.id, label: item.label });
      } else {
        acc.push({
          groupName: item.groupName,
          items: [{ id: item.id, label: item.label }],
        });
      }
      return acc;
    },
    [],
  );
};

export const DualListBox2 = ({
  included,
  excluded,
  menuButtons,
  children,
  onIncludedChange,
  onExcludedChange,
  onLoadMore,
}: DualListBox2Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [filter, setFilter] = useState("");
  const filterWords = useMemo(() => {
    const trimmed = filter.trim();
    return trimmed ? trimmed.split(/\s+/) : [];
  }, [filter]);
  const includedIds = useMemo(
    () => included.map((item) => item.id),
    [included],
  );
  const excludedIds = useMemo(
    () => excluded.map((item) => item.id),
    [excluded],
  );
  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target?.value);
    },
    [setFilter],
  );
  const handleClearButtonClick = useCallback(() => {
    included.length && onIncludedChange([]);
    excluded.length && onExcludedChange([]);
  }, [included, excluded, onIncludedChange, onExcludedChange]);

  const allIds = useMemo(() => getAllIds(children), [children]);

  const handleIncludeAllButtonClick = useCallback(() => {
    if (allIds.every((id) => included.some((item) => item.id === id))) {
      onIncludedChange([]);
      return;
    }
    onIncludedChange(allIds);
    onExcludedChange([]);
  }, [included, allIds, onIncludedChange, onExcludedChange]);

  const handleExcludeAllButtonClick = useCallback(() => {
    if (allIds.every((id) => excluded.some((item) => item.id === id))) {
      onExcludedChange([]);
      return;
    }
    onExcludedChange(allIds);
    onIncludedChange([]);
  }, [excluded, allIds, onIncludedChange, onExcludedChange]);

  return (
    <styled.DualListBox2>
      <styled.TabList>
        <li>
          <button
            type="button"
            aria-expanded={tabIndex === 0}
            onClick={() => setTabIndex(0)}
          >
            リストアイテム
          </button>
        </li>
        <li>
          <button
            type="button"
            aria-expanded={tabIndex === 1}
            onClick={() => setTabIndex(1)}
          >
            選択済みアイテム
            <styled.CountBadge>
              {includedIds.length + excludedIds.length}
            </styled.CountBadge>
          </button>
        </li>
      </styled.TabList>
      <styled.Inner>
        <DualListBox2Context.Provider
          value={{
            filterWords,
            includedIds,
            excludedIds,
            onIncludedChange,
            onExcludedChange,
          }}
        >
          <styled.LeftPanel isShow={tabIndex === 0}>
            <styled.LeftPanelHeader>
              <styled.HeaderSearch>
                <Icon name="search" size="sm" color={colors.basic[600]} />
                <input
                  placeholder="検索"
                  aria-label="検索"
                  value={filter}
                  onChange={handleFilterChange}
                />
              </styled.HeaderSearch>
              {menuButtons && (
                <ContextMenu2Container>
                  <ContextMenu2
                    trigger={
                      <styled.HeaderMenuButton type="button">
                        <Icon name="more_vert" color={colors.basic[900]} />
                      </styled.HeaderMenuButton>
                    }
                  >
                    {menuButtons}
                  </ContextMenu2>
                </ContextMenu2Container>
              )}
              <styled.HeaderCount>
                {allIds.length.toLocaleString("en-US")}件
              </styled.HeaderCount>
              <styled.HeaderButtons>
                <li>
                  <button type="button" onClick={handleIncludeAllButtonClick}>
                    <Icon name="check_thin" color={colors.blue[500]} />
                    全て追加
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleExcludeAllButtonClick}>
                    <Icon name="forbid" color={colors.red[500]} />
                    全て除外
                  </button>
                </li>
              </styled.HeaderButtons>
              <styled.HeaderLoadButton type="button" onClick={onLoadMore}>
                さらに読み込む
              </styled.HeaderLoadButton>
            </styled.LeftPanelHeader>
            <styled.LeftPanelBody>{children}</styled.LeftPanelBody>
          </styled.LeftPanel>
          <styled.RightPanel isShow={tabIndex === 1}>
            <styled.RightPanelHeader>
              <styled.SelectedCounts>
                <styled.SelectedCountIncluded>
                  <Icon name="check_thin" color={colors.blue[500]} />
                  {included.length}
                </styled.SelectedCountIncluded>
                <styled.SelectedCountExcluded>
                  <Icon name="forbid" color={colors.red[500]} />
                  {excluded.length}
                </styled.SelectedCountExcluded>
              </styled.SelectedCounts>
              <styled.SelectedClearButton>
                <Button
                  type="button"
                  color="secondary"
                  size="small"
                  disabled={!included.length && !excluded.length}
                  onClick={handleClearButtonClick}
                >
                  選択をクリア
                </Button>
              </styled.SelectedClearButton>
            </styled.RightPanelHeader>
            <styled.RightPanelBody>
              {!!included.length && (
                <styled.SelectedPanelHeading>
                  <Icon name="check_thin" color={colors.blue[500]} />
                  追加
                </styled.SelectedPanelHeading>
              )}
              {/* included はフラットな配列。アコーディオンやセクションの group ごとに分けて配置する */}
              {toGrouped(included).map((group) => (
                <Fragment key={group.groupName || "_"}>
                  {group.groupName && (
                    <DualListBox2SelectedLabel label={group.groupName} />
                  )}
                  {group.items.map((item) => (
                    <DualListBox2SelectedItem key={item.id} id={item.id}>
                      {item.label}
                    </DualListBox2SelectedItem>
                  ))}
                </Fragment>
              ))}
              {!!excluded.length && (
                <styled.SelectedPanelHeading>
                  <Icon name="forbid" color={colors.red[500]} />
                  除外
                </styled.SelectedPanelHeading>
              )}
              {/* excluded はフラットな配列。アコーディオンやセクションの group ごとに分けて配置する */}
              {toGrouped(excluded).map((group) => (
                <Fragment key={group.groupName || "_"}>
                  {group.groupName && (
                    <DualListBox2SelectedLabel label={group.groupName} />
                  )}
                  {group.items.map((item) => (
                    <DualListBox2SelectedItem key={item.id} id={item.id}>
                      {item.label}
                    </DualListBox2SelectedItem>
                  ))}
                </Fragment>
              ))}
            </styled.RightPanelBody>
          </styled.RightPanel>
        </DualListBox2Context.Provider>
      </styled.Inner>
    </styled.DualListBox2>
  );
};
