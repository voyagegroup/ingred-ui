import React from "react";
import * as Styled from "./styled";
import Icon from "../../Icon";
import Tooltip from "../../Tooltip";
import { NavigationRailContext } from "../utils";
import { useTheme } from "../../../themes";
import { NavigationRailTransitionDuration } from "../constants";

export type LabelFixtureTooltip = (isFixed: boolean) => string;

type Props = {
  labelFixtureTooltip?: LabelFixtureTooltip;
};

const Fixture = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      labelFixtureTooltip = (isFixed) =>
        `${isFixed ? "Unfix" : "Fix"} the side menu`,
    },
    ref,
  ) => {
    const theme = useTheme();
    const { isFixed, handleFixed, handleUnFixed } = React.useContext(
      NavigationRailContext,
    );

    return (
      <Tooltip
        content={labelFixtureTooltip(isFixed)}
        positionPriority={["right"]}
        offset={[0, theme.spacing * 2.5]}
        enterDelay={NavigationRailTransitionDuration}
      >
        <Styled.Container
          ref={ref}
          isFixed={isFixed}
          // eslint-disable-next-line react/jsx-handler-names
          onClick={isFixed ? handleUnFixed : handleFixed}
        >
          <Icon name="arrow_double_left" />
        </Styled.Container>
      </Tooltip>
    );
  },
);

export { Fixture };
