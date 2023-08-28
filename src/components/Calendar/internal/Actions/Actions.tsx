import React, { memo, useState } from "react";
import { Action, ActionsContainer } from "./styled";
import { useTheme } from "../../../../themes";
import { Divider, Flex } from "../../..";

export type Action = {
  text: string;
  onClick: () => void;
};

export const Actions = memo(function Actions({
  actions,
}: {
  actions?: Action[];
}) {
  const theme = useTheme();
  const [clickedAction, setClickedAction] = useState<string | null>(null);

  const handleClick = (action: Action) => () => {
    setClickedAction(action.text);
    action.onClick();
  };

  return actions ? (
    <Flex display="flex">
      <ActionsContainer>
        {actions.map((action, i) => (
          <Action
            key={`${action.text}-${i.toString()}`}
            clicked={clickedAction === action.text}
            onClick={handleClick(action)}
          >
            {action.text}
          </Action>
        ))}
      </ActionsContainer>
      <Divider
        ml={1}
        mr={1}
        orientation="vertical"
        color={theme.palette.divider}
      />
    </Flex>
  ) : null;
});
