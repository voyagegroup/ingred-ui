import * as React from "react";
import * as Styled from "./styled";
import Typography from "../../../Typography";

type ValueType = number;

export type TabItem = {
  label: string;
  value: ValueType;
};

type Props = {
  value: ValueType;
  items: TabItem[];
  onChange: (value: ValueType) => void;
};

const TableTabs: React.FunctionComponent<Props> = ({
  items,
  value,
  onChange,
}) => {
  const handleChange = (value: ValueType) => () => {
    onChange(value);
  };
  return (
    <Styled.Container>
      <Styled.TabContainer>
        {items.map((item) => (
          <Styled.TabItem
            key={item.value}
            active={item.value === value}
            onClick={handleChange(item.value)}
          >
            <Typography
              size="sm"
              color={item.value === value ? "initial" : "secondary"}
              align="center"
            >
              {item.label}
            </Typography>
          </Styled.TabItem>
        ))}
      </Styled.TabContainer>
    </Styled.Container>
  );
};

export { TableTabs };
