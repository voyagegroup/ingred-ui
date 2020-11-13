import React from "react";
import * as Styled from "./styled";
import Icon from "../../Icon";
import Tooltip from "../../Tooltip";
import { NavigationRailContext } from "../utils";
import { useTheme } from "../../../themes";
import { NavigationRailTransitionDuration } from "../constants";

type Props = {};

const Fixture: React.FC<Props> = () => {
  const theme = useTheme();
  const { isFixed, handleFixed, handleUnFixed } = React.useContext(
    NavigationRailContext,
  );

  return (
    <Tooltip
      content={`サイドメニューを${isFixed ? "閉じる" : "開く"}`}
      positionPriority={["right"]}
      offset={[0, theme.spacing * 2.5]}
      enterDelay={NavigationRailTransitionDuration}
    >
      <Styled.Container
        isFixed={isFixed}
        onClick={isFixed ? handleUnFixed : handleFixed}
      >
        <Icon name="arrow_double_left" />
      </Styled.Container>
    </Tooltip>
  );
};

export { Fixture };
