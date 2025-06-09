import * as React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes/useTheme";
import { BadgeProps, BadgeColor, BadgeType, BadgeSize } from "./types";

const Badge = React.forwardRef<HTMLSpanElement | HTMLAnchorElement, BadgeProps>(
  function Badge(
    {
      color,
      type = "normal",
      component = "span",
      fontSize = "13px",
      fontWeight = "normal",
      size = "medium",
      icon,
      children,
      ...rest
    },
    ref,
  ) {
    const theme = useTheme();
    
    // Signal Badge
    if (type === "signal") {
      return (
        <Styled.SignalWrapper
          ref={ref as any}
          as={component as any}
          size={size}
          {...rest}
        >
          <Styled.SignalDot
            backgroundColor={Styled.getBackgroundColor(color, theme, "signal")}
            size={size}
          />
          <Styled.SignalText>{children}</Styled.SignalText>
        </Styled.SignalWrapper>
      );
    }
    
    // Normal & Pill Badge
    const textColor = Styled.getTextColor(color, theme, type);
    const backgroundColor = Styled.getBackgroundColor(color, theme, type);
    
    // コンポーネントの共通プロパティ
    const commonProps = {
      ref,
      as: component as any,
      color: textColor,
      backgroundColor,
      fontSize,
      fontWeight,
      size,
      ...rest
    };
    
    // タイプに応じたコンポーネントをレンダリング
    const BadgeComponent = type === "normal" ? Styled.NormalBadge : Styled.PillBadge;
    
    return (
      <BadgeComponent {...commonProps}>
        {icon && (
          <Styled.Icon>
            {icon}
          </Styled.Icon>
        )}
        {children}
      </BadgeComponent>
    );
  },
);

export default Badge;
