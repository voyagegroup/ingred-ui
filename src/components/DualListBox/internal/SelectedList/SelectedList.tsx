import React from "react";
import * as Styled from "./styled";
import { DualListBoxItem } from "../../DualListBox";
import Icon from "../../../Icon/Icon";
import { useTheme } from "../../../../themes";
import Typography from "../../../Typography/Typography";

export const SelectedList: React.FunctionComponent<{
  items: DualListBoxItem[];
  selectedItemTitle: string;
  onRemove?: (item: DualListBoxItem) => void;
  onToggleChange?: (item: DualListBoxItem) => void;
}> = ({ items, selectedItemTitle, onRemove }) => {
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
            {item.content}
            <Styled.Action>
              {onRemove && (
                <Styled.RemoveButton
                  type={"button"}
                  onClick={() => onRemove(item)}
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
