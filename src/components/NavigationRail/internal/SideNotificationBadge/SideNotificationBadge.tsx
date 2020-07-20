import * as React from "react";
import * as Styled from "./styled";

type Props = {
  notificationCount?: number;
  invisible?: boolean;
};

const SideNotificationBadge: React.FunctionComponent<Props> = ({
  notificationCount = 0,
  invisible = false,
}) => {
  const displayCount = notificationCount >= 100 ? "99+" : notificationCount;
  return (
    <Styled.Container invisible={invisible}>{displayCount}</Styled.Container>
  );
};

export { SideNotificationBadge };
