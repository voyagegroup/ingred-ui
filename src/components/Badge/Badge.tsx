import * as React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes/useTheme";
import { BadgeProps } from "./types";
import { IconSize } from "../Icon/Icon";

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

    // バッジサイズからアイコンサイズへの変換
    const getIconSize = (badgeSize: string): IconSize | number => {
      switch (badgeSize) {
        case "small":
          return 14; // 直接ピクセル値を指定
        case "medium":
        default:
          return 16; // 直接ピクセル値を指定
      }
    };

    // Signal Badge
    if (type === "signal") {
      return (
        <Styled.SignalWrapper
          ref={ref as any}
          as={component as any}
          size={size}
          fontWeight={fontWeight}
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
      ...rest,
    };

    // タイプに応じたコンポーネントをレンダリング
    const BadgeComponent =
      type === "normal" ? Styled.NormalBadge : Styled.PillBadge;

    // アイコン要素にアイコンサイズを設定
    const iconElement = icon
      ? React.cloneElement(icon as React.ReactElement, {
          size: getIconSize(size),
        })
      : null;

    return (
      <BadgeComponent {...commonProps}>
        {iconElement && <Styled.Icon>{iconElement}</Styled.Icon>}
        <Styled.Text>{children}</Styled.Text>
      </BadgeComponent>
    );
  },
);

export default Badge;
