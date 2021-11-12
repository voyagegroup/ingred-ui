import * as React from "react";
import Badge from "../../Badge";
import { useTheme } from "../../../themes";
import * as Styled from "../styled";
import Flex from "../../Flex";

type TabProps = {
  text: string;
  count?: number;
  value: any;
  selected: boolean;
  withBadge: boolean;
  onChange?: (value: any) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ text, count, value, withBadge, selected, onChange, onClick }, ref) => {
    const theme = useTheme();
    const badgeColor = selected ? "primary" : "secondary";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!selected && onChange) {
        onChange(value);
      }
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Styled.Button
        ref={ref}
        key={text}
        value={value}
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
