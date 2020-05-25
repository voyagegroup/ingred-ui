import React from "react";
import * as Styled from "./styled";
import Icon from "../../../Icon";
import Tooltip from "../../../Tooltip";
import { DrawerContext } from "../../utils";

type Props = {};

const DrawerFixture: React.FC<Props> = () => {
  const { isFixed, onHandleFix } = React.useContext(DrawerContext);

  return (
    <Tooltip
      content={`サイドメニューを${isFixed ? "閉じる" : "開く"}`}
      positionPriority={["right"]}
      offset={[0, 20]}
      openDelay={300}
    >
      <Styled.Container isFixed={isFixed} onClick={onHandleFix}>
        <Icon name="arrow_double_left" />
      </Styled.Container>
    </Tooltip>
  );
};

export { DrawerFixture };
