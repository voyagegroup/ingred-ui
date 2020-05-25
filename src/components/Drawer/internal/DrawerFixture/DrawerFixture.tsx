import React from "react";
import * as Styled from "./styled";
import Icon from "../../../Icon";
import { DrawerContext } from "../../utils";

type Props = {};

const DrawerFixture: React.FC<Props> = () => {
  const { isFixed, onHandleFix } = React.useContext(DrawerContext);

  return (
    <Styled.Container isFixed={isFixed} onClick={onHandleFix}>
      <Icon name="arrow_double_left" />
    </Styled.Container>
  );
};

export { DrawerFixture };
