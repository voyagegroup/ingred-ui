import * as React from "react";
import * as Styled from "./styled";

type Props = {
  notificationCount?: number;
};

const SideNotificationBadge: React.FunctionComponent<Props> = ({
  notificationCount = 0,
}) =>
  notificationCount === 0 ? null : (
    <Styled.Container>{notificationCount}</Styled.Container>
  );

export { SideNotificationBadge };
