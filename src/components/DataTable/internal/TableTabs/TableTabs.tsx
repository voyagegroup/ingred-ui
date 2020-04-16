import * as React from "react";
import * as Styled from "./styled";

type ValueType = number;

export type TabItem = {
  label: string;
  value: ValueType;
};

type Props = {
  value: ValueType;
  items: TabItem[];
  onChange: (value: ValueType) => void;
  width?: string;
};

const TableTabs: React.FunctionComponent<Props> = ({
  items,
  value,
  onChange,
  width,
}) => {
  const tabItemWidth = 100 / items.length;
  const onHandleChange = (value: ValueType) => () => {
    onChange(value);
  };
  return (
    <Styled.Container>
      <Styled.TabContainer width={width || "100%"}>
        {items.map((item) => (
          <Styled.TabItem
            key={item.value}
            width={`${tabItemWidth}%`}
            active={item.value === value}
            onClick={onHandleChange(item.value)}
          >
            {item.label}
          </Styled.TabItem>
        ))}
      </Styled.TabContainer>
    </Styled.Container>
  );
};

export { TableTabs };
