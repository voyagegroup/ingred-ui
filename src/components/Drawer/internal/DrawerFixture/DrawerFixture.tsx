import React from "react";
import * as Styled from "./styled";
import Icon from "../../../Icon";
import Tooltip from "../../../Tooltip";
import { DrawerContext } from "../../utils";
import { useTheme } from "../../../../themes";
import { DrawerTransitionDuration } from "../../constants";

type Props = {};

const DrawerFixture: React.FC<Props> = () => {
  const theme = useTheme();
  const { isFixed, onHandleFix } = React.useContext(DrawerContext);

  return (
    <Tooltip
      content={`サイドメニューを${isFixed ? "閉じる" : "開く"}`}
      positionPriority={["right"]}
      offset={[0, theme.spacing * 2.5]}
      openDelay={DrawerTransitionDuration}
    >
      <Styled.Container isFixed={isFixed} onClick={onHandleFix}>
        <Icon name="arrow_double_left" />
      </Styled.Container>
    </Tooltip>
  );
};

export { DrawerFixture };
