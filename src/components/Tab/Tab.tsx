import * as React from "react";
import { Badge } from "..";
import { useTheme } from "../../themes";
import * as Styled from "./styled";
import Flex from "../Flex";
import useEventCallback from "../../hooks/useEventCallback";

type TabsProps = {
  data: {
    text: string;
    count?: number;
  }[];
  value: any;
  withBadge?: boolean;
  onChange: (event: any, value: any) => void;
};

type TabProps = {
  text: string;
  count?: number;
  selected: boolean;
  withBadge: boolean;
  onChange?: (event: any, value: any) => void;
  onClick?: (event: any) => void;
};

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ text, count, withBadge, selected, onChange, onClick }, ref) => {
    const theme = useTheme();
    const badgeColor = selected ? "primary" : "secondary";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!selected && onChange) {
        onChange(event, text);
      }
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Styled.Button
        ref={ref}
        key={text}
        tabIndex={selected ? 0 : -1}
        theme={theme}
        selected={selected}
        onClick={handleClick}
      >
        <Flex display="flex" justifyContent="space-between" alignItems="center">
          <Styled.Text selected={selected}>{text} </Styled.Text>
          {withBadge ? (
            <Badge color={badgeColor} type="pill" fontWeight="bold">
              {count}
            </Badge>
          ) : (
            ""
          )}
        </Flex>
      </Styled.Button>
    );
  },
);

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ data, value, withBadge = false, onChange }, ref) => {
    const valueToIndex = new Map();
    const tabsRef = React.useRef<HTMLDivElement>(null);
    const childrenRef = React.useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = React.useState({});

    const getTabsMeta = () => {
      const tabsNode = tabsRef.current;
      let tabsMeta;
      if (tabsNode) {
        const rect = tabsNode.getBoundingClientRect();
        tabsMeta = {
          clientWidth: tabsNode.clientWidth,
          scrollLeft: tabsNode.scrollLeft,
          scrollTop: tabsNode.scrollTop,
          scrollWidth: tabsNode.scrollWidth,
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
        };
      }

      let tabMeta;
      if (tabsNode && value !== false) {
        if (childrenRef.current) {
          const children = childrenRef.current.children;

          if (children.length > 0) {
            const tab = children[valueToIndex.get(value)];
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
      <Styled.Container ref={tabsRef}>
        <Styled.Indicator
          style={{
            ...indicatorStyle,
          }}
        />
        <Styled.ChildContainer ref={childrenRef}>
          {data.map((d, index) => {
            const childValue = d.text ?? index;
            valueToIndex.set(childValue, index);
            return (
              <Tab
                key={d.text}
                selected={value === d.text}
                count={d.count}
                withBadge={withBadge}
                text={d.text}
                onChange={(event) => onChange(event, d.text)}
              />
            );
          })}
          <Styled.Border />
        </Styled.ChildContainer>
      </Styled.Container>
    );
  },
);

export default Tabs;
