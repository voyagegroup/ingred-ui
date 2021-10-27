import * as React from "react";
import { Badge } from "..";
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
  onChange: (event: any, value: any) => void;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
};

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ text, count, withBadge, selected, onChange, onClick, onFocus }, ref) => {
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

    return (
      <button
        ref={ref}
        key={text}
        style={{
          maxWidth: 360,
          minWidth: 90,
          position: "relative",
          minHeight: 48,
          flexShrink: 0,
          padding: "12px 16px",
          overflow: "hidden",
          whiteSpace: "normal",
          textAlign: "center",
          flexDirection: "column",
          lineHeight: 1.25,
        }}
        tabIndex={selected ? 0 : -1}
        onClick={handleClick}
      >
        {text}
        {withBadge ? <Badge color="primary">{count}</Badge> : ""}
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
          {data.map((d) => (
            <Tab
              key={d.text}
              count={d.count}
              withBadge={withBadge}
              text={d.text}
              onChange={(event) => onChange(event, d.text)}
            />
          ))}
        </div>
        {value}
      </div>
    );
  },
);

export default Tabs;
