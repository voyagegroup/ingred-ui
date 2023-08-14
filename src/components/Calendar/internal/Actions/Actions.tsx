import React, { memo, useState } from "react";
import { Action, ActionsContainer } from "./styled";
import { useTheme } from "../../../../themes";
import { Divider, Flex } from "../../..";

export type Action = {
  text: string;
  onClick: () => void;
};

// CalendarRange が実装されたら移動する
export const Actions = memo(({ actions }: { actions?: Action[] }) => {
  const theme = useTheme();
  const [clickedAction, setClickedAction] = useState<string | null>(null);

  return actions ? (
    <Flex display="flex">
      <ActionsContainer>
        {actions.map(({ text, onClick }, i) => (
          <Action
            key={`${text}-${i.toString()}`}
            clicked={clickedAction === text}
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => {
              setClickedAction(text);
              onClick();
            }}
          >
            {text}
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
