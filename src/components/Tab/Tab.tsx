import * as React from "react";
import { Badge } from "..";
import { useTheme } from "../../themes";
// import * as Styled from "./styled";

type TabsProps = {
  data: {
    text: string;
    count?: number;
  }[];
  value: any;
  isBadge?: boolean;
  onChange: (event: any, value: any) => void;
};

type TabProps = {
  text: string;
  count?: number;
  selected: boolean;
  withBadge: boolean;
  onChange?: (event: any, value: any) => void;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
};

// TODO Tabは props で貰った値を愚直に表示するだけにする
const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ text, count, withBadge, selected, onChange, onClick, onFocus }, ref) => {
    const theme = useTheme();
    const badgeColor = selected ? "primary" : "secondary";

    const handleClick = (event) => {
      if (!selected && onChange) {
        onChange(event, text);
      }
      if (onClick) {
        onClick(event);
      }
    };

    const handleFocus = (event) => {
      if (!selected && onChange) {
        onChange(event, text);
      }

      if (onFocus) {
        onFocus(event);
      }
    };

    // TODO ロジック書く
    const h: any = {
      color: "gray",
      flexDirection: "column",
      flexShrink: 0,
      fontWeight: 600,
      lineHeight: 1.25,
      maxWidth: 360,
      minHeight: 48,
      minWidth: 90,
      overflow: "hidden",
      margin: 0,
      padding: "12px 16px",
      position: "relative",
      textAlign: "center",
      alignItems: "center",
      whiteSpace: "normal",
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      borderBottom: "none",
    };

    // TODO ロジック書き直す
    if (selected) {
      h.borderBottom = `solid ${theme.palette.primary.main} 2px`;
      h.color = `${theme.palette.primary.main}`;
    }

    return (
      <button
        ref={ref}
        key={text}
        style={h}
        tabIndex={selected ? 0 : -1}
        onClick={handleClick}
      >
        {text}{" "}
        {withBadge ? (
          <Badge color={badgeColor} type="pill">
            {count}
          </Badge>
        ) : (
          ""
        )}
      </button>
    );
  },
);

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ data, value, withBadge = false, onChange }, ref) => {
    // return isBadge ? <div>badge</div> : <div>no badge</div>;
    return (
      <div>
        <div>
          {data.map((d) => {
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
        </div>
        <hr style={{ width: "100%" }} />
        {value}
      </div>
    );
  },
);

export default Tabs;
