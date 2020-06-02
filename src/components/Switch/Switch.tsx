import * as React from "react";
import * as Styled from "./styled";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import Typography from "../Typography";
import Tooltip from "../Tooltip";

type Case = {
  name: string;
  value?: any;
};
type CaseWithIcon = Case & {
  icon: IconName;
};

type Props = {
  cases: Case[] | CaseWithIcon[];
  value: any;
  onChange?: (value: any) => void;
};

const Switch: React.FunctionComponent<Props> = ({ cases, value, onChange }) => {
  const items = cases as {
    name: string;
    icon?: IconName;
    value?: any;
  }[];
  const onHandleChange = (value: any) => () => {
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <Styled.Container>
      {items.map((item, index) => {
        const childValue = item.value === undefined ? index : item.value;
        const active = childValue === value;
        return (
          <Tooltip
            key={item.name}
            content={item.name}
            positionPriority={["top-start"]}
            offset={[0, 15]}
          >
            {item.icon != null ? (
              <Styled.IconItemContainer
                active={active}
                onClick={onHandleChange(childValue)}
              >
                <Icon name={item.icon} size="lg" />
              </Styled.IconItemContainer>
            ) : (
              <Styled.TextItemContainer
                key={item.name}
                active={active}
                onClick={onHandleChange(childValue)}
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
    </Styled.Container>
  );
};

export default Switch;
