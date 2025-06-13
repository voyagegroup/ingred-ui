import * as React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes/useTheme";
import {
  BadgeProps,
  BADGE_SIZE,
  getBackgroundColor,
  getTextColor,
} from "./types";

// コンポーネント型の定義
type BadgeComponentType = React.ElementType<any>;

const Badge = React.forwardRef<HTMLSpanElement | HTMLAnchorElement, BadgeProps>(
  function Badge(
    {
      color,
      type = "normal",
      component = "span",
      fontSize,
      fontWeight = "normal",
      size = "medium",
      icon,
      children,
      ...rest
    },
    ref,
  ) {
    const theme = useTheme();

    // アイコン要素の生成（サイズを設定）
    const iconElement = React.useMemo(() => {
      if (!icon) return null;

      const iconSize = BADGE_SIZE[size].iconSize;
      return React.cloneElement(icon as React.ReactElement, { size: iconSize });
    }, [icon, size]);

    // Signal Badge
    if (type === "signal") {
      return (
        <Styled.SignalWrapper
          ref={ref as React.Ref<HTMLSpanElement>}
          as={component as BadgeComponentType}
          size={size}
          fontWeight={fontWeight}
          fontSize={fontSize}
          {...rest}
        >
          <Styled.SignalDot
            backgroundColor={getBackgroundColor(color, theme, "signal")}
            size={size}
          />
          {children}
        </Styled.SignalWrapper>
      );
    }

    // Normal & Pill Badge
    const textColor = getTextColor(color, theme, type);
    const backgroundColor = getBackgroundColor(color, theme, type);

    // タイプに応じたコンポーネントをレンダリング
    const BadgeComponent =
      type === "normal" ? Styled.NormalBadge : Styled.PillBadge;

    return (
      <BadgeComponent
        ref={ref}
        as={component as BadgeComponentType}
        color={textColor}
        backgroundColor={backgroundColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        size={size}
        {...rest}
      >
        {iconElement && <Styled.Icon>{iconElement}</Styled.Icon>}
        {children}
      </BadgeComponent>
    );
  },
);

export default Badge;
