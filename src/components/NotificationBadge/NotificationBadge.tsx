import * as React from "react";
import * as Styled from "./styled";

export type Props = {
  content?: number | string;
  position?: Styled.BadgeProps["position"];
  size?: Styled.BadgeProps["size"];
  max?: number;
};

const NotificationBadge: React.FunctionComponent<Props> = ({
  content,
  position = "top-right",
  size = "medium",
  max = 99,
  children,
}) => {
  const variant = content === undefined ? "dot" : "normal";
  let displayContent = content;
  if (typeof content === "number" && max < content) {
    displayContent = `${max}+`;
  }
  return (
    <Styled.Container>
      {children && children}
      <Styled.Badge variant={variant} position={position} size={size}>
        {displayContent}
      </Styled.Badge>
    </Styled.Container>
  );
};

export default NotificationBadge;
