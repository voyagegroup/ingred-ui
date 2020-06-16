import * as React from "react";
import * as Styled from "./styled";
import {
  ToastProps,
  AppearanceTypes,
  Placement,
} from "react-toast-notifications";
import Flex from "../../Flex";
import Icon from "../../Icon";
import Typography from "../../Typography";
import { Theme, useTheme } from "../../../themes";

type ToastStyle = {
  background: string;
  boxShadow: string;
  icon: JSX.Element;
  iconBackground: string;
  titleColor: string;
  contentColor: string;
  closeColor: string;
};

const getToastStyles = ({
  palette,
}: Theme): Record<AppearanceTypes, ToastStyle> => ({
  info: {
    background: palette.primary.highlight,
    boxShadow: `0px 0px 16px ${palette.primary.highlight}66`,
    icon: <Icon name="close" color={palette.white} />,
    iconBackground: palette.primary.main,
    titleColor: palette.primary.deepDark,
    contentColor: palette.primary.main,
    closeColor: palette.primary.light,
  },
  success: {
    background: palette.success.highlight,
    boxShadow: `0px 0px 16px ${palette.success.highlight}66`,
    icon: <Icon name="check" color={palette.white} />,
    iconBackground: palette.success.main,
    titleColor: palette.success.deepDark,
    contentColor: palette.success.main,
    closeColor: palette.success.light,
  },
  warning: {
    background: palette.warning.highlight,
    boxShadow: `0px 0px 16px ${palette.warning.highlight}66`,
    icon: <Icon name="close" color={palette.white} />,
    iconBackground: palette.warning.main,
    titleColor: palette.warning.deepDark,
    contentColor: palette.warning.main,
    closeColor: palette.warning.light,
  },
  error: {
    background: palette.danger.highlight,
    boxShadow: `0px 0px 16px ${palette.danger.highlight}66`,
    icon: <Icon name="forbid" color={palette.white} />,
    iconBackground: palette.danger.main,
    titleColor: palette.danger.deepDark,
    contentColor: palette.danger.main,
    closeColor: palette.danger.light,
  },
});

type TranslateMapKey = "right" | "left" | "bottom" | "top";
const translateMap = {
  right: "translate3d(120%, 0, 0)",
  left: "translate3d(-120%, 0, 0)",
  bottom: "translate3d(0, 120%, 0)",
  top: "translate3d(0, -120%, 0)",
};
function getTranslate(placement: Placement) {
  const pos = placement.split("-");
  const relevantPlacement = pos[1] === "center" ? pos[0] : pos[1];

  return translateMap[relevantPlacement as TranslateMapKey];
}

const toastStates = (placement: Placement) => ({
  entering: { transform: `${getTranslate(placement)}`, opacity: 0 },
  entered: { transform: "translate3d(0,0,0)", opacity: 1 },
  exiting: { transform: "scale(0.66)", opacity: 0 },
  exited: { transform: "scale(0.66)", opacity: 0 },
});

type Props = {} & ToastProps;

const DefaultToast: React.FunctionComponent<Props> = ({
  appearance,
  placement,
  transitionDuration,
  transitionState,
  onDismiss,
  children,
  autoDismiss,
  autoDismissTimeout,
  isRunning,
}) => {
  const theme = useTheme();
  const toastStyle = getToastStyles(theme)[appearance];
  const [height, setHeight] = React.useState<number | "auto">("auto");
  const elementRef = React.useRef<HTMLDivElement>(null);

  const onHandleClose = () => {
    onDismiss();
  };

  React.useEffect(() => {
    if (transitionState === "entered") {
      const el = elementRef.current;
      if (el) {
        setHeight(el.offsetHeight + theme.spacing);
      }
    }
    if (transitionState === "exiting") {
      setHeight(0);
    }
  }, [transitionState, theme.spacing]);
  return (
    <Styled.Wrapper
      ref={elementRef}
      style={{ height }}
      transitionDuration={transitionDuration}
    >
      <Styled.Container
        background={toastStyle.background}
        boxShadow={toastStyle.boxShadow}
        transitionDuration={transitionDuration}
        {...toastStates(placement)[transitionState]}
      >
        <Flex
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex display="flex" alignItems="center">
            <Styled.IconContainer background={toastStyle.iconBackground}>
              {toastStyle.icon}
            </Styled.IconContainer>
            <Typography color={toastStyle.titleColor} weight="bold">
              {children}
            </Typography>
          </Flex>
          <Styled.CloseIconContainer onClick={onHandleClose}>
            <Icon name="close" color={toastStyle.closeColor} />
          </Styled.CloseIconContainer>
        </Flex>
        <Styled.Countdown
          opacity={autoDismiss ? 1 : 0}
          autoDismissTimeout={autoDismissTimeout}
          isRunning={isRunning}
          backgroundColor={toastStyle.iconBackground}
        />
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default DefaultToast;
