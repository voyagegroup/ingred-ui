import * as React from "react";
import * as Styled from "./styled";
import { Tab } from "./internal/Tab";
import useEventCallback from "../../hooks/useEventCallback";
import { useMergeRefs } from "../../hooks/useMergeRefs";

type TabsProps<T> = {
  data: {
    text: string;
    count?: number;
    value: T;
  }[];
  value: T;
  withBadge?: boolean;
  onChange?: (value: T) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Tabs = <T,>(
  props: TabsProps<T>,
  ref: React.Ref<HTMLDivElement>,
): React.ReactElement<TabsProps<T>> => {
  const { data, value, withBadge = false, onChange, onClick } = props;
  const valueToIndex = new Map<T, number>();
  const childrenRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState({});
  const [tabs, setTabs] = React.useState<HTMLDivElement | null>(null);
  const refs = useMergeRefs<HTMLDivElement>(ref, setTabs);

  const getTabsMeta = () => {
    const tabsNode = tabs ?? undefined;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      tabsMeta = {
        scrollLeft: tabsNode.scrollLeft,
        left: rect.left,
      };
    }

    let tabMeta;
    if (tabsNode && value) {
      if (childrenRef.current) {
        const children = childrenRef.current.children;

        if (children.length > 0) {
          const index = valueToIndex.get(value) as number;
          const tab = children[index];
          tabMeta = tab?.getBoundingClientRect() || null;
        }
      }
    }
    return { tabsMeta, tabMeta };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    let startValue = 0;

    if (tabMeta && tabsMeta) {
      const correction = tabsMeta.scrollLeft;
      startValue = tabMeta.left - tabsMeta.left + correction;
    }

    const newIndicatorStyle = {
      left: startValue,
      width: tabMeta ? tabMeta.width : 0,
    };

    if (isNaN(indicatorStyle["left"]) || isNaN(indicatorStyle["width"])) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const start = Math.abs(
        indicatorStyle["left"] - newIndicatorStyle["left"],
      );
      const size = Math.abs(
        indicatorStyle["width"] - newIndicatorStyle["width"],
      );

      if (start >= 1 || size >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  React.useEffect(() => {
    updateIndicatorState();
  });

  React.useEffect(() => {
    const handleResize = () => {
      updateIndicatorState();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicatorState]);

  return (
    <Styled.ChildContainer ref={refs}>
      <Styled.Indicator
        style={{
          ...indicatorStyle,
        }}
      />
      <Styled.ChildrenContainer ref={childrenRef}>
        {data.map((d, index) => {
          const childValue = d.value;
          const selected = childValue === value;
          valueToIndex.set(childValue, index);
          return (
            <Tab
              key={index.toString()}
              selected={selected}
              value={childValue}
              count={d.count}
              withBadge={withBadge}
              text={d.text}
              onChange={onChange}
              onClick={onClick}
            />
          );
        })}
        <Styled.Border />
      </Styled.ChildrenContainer>
    </Styled.ChildContainer>
  );
};

export default React.forwardRef(Tabs) as <T>(
  props: TabsProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => ReturnType<typeof Tabs>;
