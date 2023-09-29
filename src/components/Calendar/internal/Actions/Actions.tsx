import React, { memo, useState } from "react";
import { Action, ActionsContainer } from "./styled";
import { useTheme } from "../../../../themes";
import { Divider, Flex } from "../../..";

export type Action = {
  text: string;
  onClick: () => void;
};

export const Actions = memo(function Actions({
  defaultClickAction,
  actions,
  onClickAction,
}: {
  defaultClickAction?: string;
  actions?: Action[];
  onClickAction?: (action: Action) => void;
}) {
  const theme = useTheme();
  const [clickedAction, setClickedAction] = useState<string | undefined>(
    defaultClickAction,
  );

  const handleClick = (action: Action) => () => {
    setClickedAction(action.text);
    action.onClick();
    onClickAction?.(action);
  };

  return actions ? (
    <Flex display="flex">
      <ActionsContainer height="380px">
        <>
          {actions.map((action, i) => (
            <Action
              key={`${action.text}-${i.toString()}`}
              clicked={clickedAction === action.text}
              onClick={handleClick(action)}
            >
              {action.text}
            </Action>
          ))}
        </>
      </ActionsContainer>
      <Divider
        ml={1}
        mr={1}
        orientation="vertical"
        // MEMO: divider デザイントークンで basic[200] に該当するものがないので、一旦 gray で代用
        color={theme.palette.gray.light}
      />
    </Flex>
  ) : null;
});
