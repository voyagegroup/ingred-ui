import * as React from "react";
import { Badge } from "..";
import { useTheme } from "../../themes";
import * as Styled from "./styled";

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
        {text}{" "}
        {withBadge ? (
          <Badge color={badgeColor} type="pill">
            {count}
          </Badge>
        ) : (
          ""
        )}
      </Styled.Button>
    );
  },
);

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ data, value, withBadge = false, onChange }, ref) => {
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
