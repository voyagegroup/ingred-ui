import React from "react";
import * as Styled from "./styled";
import { Item } from "../../DualListBox";
import Icon from "../../../Icon/Icon";
import { useTheme } from "../../../../themes";
import Typography from "../../../Typography/Typography";
import ToggleButton from "../../../ToggleButton/ToggleButton";

export const SelectedList: React.FunctionComponent<{
  items: Item[];
  onRemove?: (id: string) => void;
  onToggleInverse?: (id: string) => void;
}> = ({ items, onRemove, onToggleInverse }) => {
  const theme = useTheme();

  return (
    <Styled.Container>
      <Styled.SelectedHeader>
        <Typography size="sm" weight="bold">
          <Typography color="primary" component="span" size="sm" weight="bold">
            {items.length}個
          </Typography>
          選択済み
        </Typography>
      </Styled.SelectedHeader>
      <Styled.SelectedList>
        {items.map((item) => (
          <Styled.SelectedItem key={item.id}>
            <Typography>{item.label}</Typography>
            <Styled.Action>
              {onToggleInverse && (
                <ToggleButton
                  checkedText=""
                  unCheckedText=""
                  checked={item.isInverse ?? false}
                  onChange={() => onToggleInverse(item.id)}
                >
                  aaa
                </ToggleButton>
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
