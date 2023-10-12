import React from "react";
import * as Styled from "./styled";
import { SelectedItem } from "../../DualListBox";
import Icon from "../../../Icon/Icon";
import { useTheme } from "../../../../themes";
import Typography from "../../../Typography/Typography";
import ToggleButton from "../../../ToggleButton/ToggleButton";

export const SelectedList: React.FunctionComponent<{
  items: SelectedItem[];
  selectedItemTitle: string;
  onRemove?: (id: string) => void;
  onToggleChange?: (id: string) => void;
}> = ({ items, selectedItemTitle, onRemove, onToggleChange }) => {
  const theme = useTheme();

  return (
    <Styled.Container>
      <Styled.SelectedHeader>
        <Typography size="sm" weight="bold">
          <Typography color="primary" component="span" size="sm" weight="bold">
            {items.length}{" "}
          </Typography>
          {selectedItemTitle}
        </Typography>
      </Styled.SelectedHeader>
      <Styled.SelectedList>
        {items.map((item, i) => (
          <Styled.SelectedItem
            key={item.id}
            isLastIndex={i + 1 === items.length}
          >
            <Typography>{item.label}</Typography>
            <Styled.Action>
              {onToggleChange && (
                <ToggleButton
                  checkedText=""
                  unCheckedText=""
                  width="48px"
                  checked={item.checked}
                  onChange={() => onToggleChange(item.id)}
                />
              )}
              {onRemove && (
                <Styled.RemoveButton
                  type={"button"}
                  onClick={() => onRemove(item.id)}
                >
                  <Icon name="close" size="sm" color={theme.palette.black} />
                </Styled.RemoveButton>
              )}
            </Styled.Action>
          </Styled.SelectedItem>
        ))}
      </Styled.SelectedList>
    </Styled.Container>
  );
};
