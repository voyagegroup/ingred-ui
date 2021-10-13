import * as React from "react";
import * as Styled from "./styled";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import Typography from "../Typography";
import Tooltip from "../Tooltip";
import useEventCallback from "../../hooks/useEventCallback";

type Case = {
  name: string;
  value?: any;
};
type CaseWithIcon = Case & {
  icon: IconName;
};

export type SwitchProps = {
  cases: Case[] | CaseWithIcon[];
  value: any;
  onChange?: (value: any) => void;
};

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  ({ cases, value, onChange }, ref) => {
    const items = cases as {
      name: string;
      icon?: IconName;
      value?: any;
    }[];
    const valueToIndex = new Map();
    const tabsRef = React.useRef<HTMLDivElement>(null);
    const childrenWrapperRef = React.useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = React.useState({});
    const handleChange = (value: any) => () => {
      if (onChange) {
        onChange(value);
      }
    };

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
        if (childrenWrapperRef.current) {
          const children = childrenWrapperRef.current.children;

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
        const dStart = Math.abs(
          indicatorStyle["left"] - newIndicatorStyle["left"],
        );
        const dSize = Math.abs(
          indicatorStyle["width"] - newIndicatorStyle["width"],
        );

        if (dStart >= 1 || dSize >= 1) {
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
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [updateIndicatorState]);

    return (
      <Styled.Container ref={ref}>
        <Styled.ChildContainer ref={tabsRef}>
          <Styled.Indicator
            style={{
              ...indicatorStyle,
            }}
          />
          <Styled.ChildrenContainer ref={childrenWrapperRef}>
            {items.map((item, index) => {
              const childValue = item.value === undefined ? index : item.value;
              valueToIndex.set(childValue, index);
              const active = childValue === value;
              return (
                <Tooltip
                  key={item.name}
                  content={item.name}
                  positionPriority={["top-start", "bottom-start", "auto"]}
                  offset={[0, 15]}
                >
                  {item.icon != null ? (
                    <Styled.IconItemContainer
                      onClick={handleChange(childValue)}
                    >
                      <Icon name={item.icon} size="lg" />
                    </Styled.IconItemContainer>
                  ) : (
                    <Styled.TextItemContainer
                      key={item.name}
                      onClick={handleChange(childValue)}
                    >
                      <Typography
                        component="span"
                        size="sm"
                        weight={active ? "bold" : "normal"}
                        color="secondary"
                      >
                        {item.name}
                      </Typography>
                    </Styled.TextItemContainer>
                  )}
                </Tooltip>
              );
            })}
          </Styled.ChildrenContainer>
        </Styled.ChildContainer>
      </Styled.Container>
    );
  },
);

export default Switch;
