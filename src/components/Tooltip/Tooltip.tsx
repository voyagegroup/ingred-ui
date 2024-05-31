import * as React from "react";
import * as Styled from "./styled";
import Fade from "../Fade";
import { Placement } from "@floating-ui/core";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";
import {
  autoPlacement,
  flip,
  useFloating,
  offset as floatingOffset,
  shift,
  arrow,
  autoUpdate,
  useRole,
  useInteractions,
  FloatingPortal,
  useHover,
  FloatingArrow,
  FloatingDelayGroup,
} from "@floating-ui/react";
import { useTheme } from "../../themes";
import { AutoPlacement, usePlacement } from "../../hooks/usePlacement";

export type TooltipProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "content"
> & {
  content: React.ReactNode;
  open?: boolean;
  disableHoverListener?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  /**
   * Define priority of position. Please check [this](https://floating-ui.com/docs/tutorial#placements).
   */
  positionPriority?: (Placement | AutoPlacement)[];
  offset?: [number, number];
  width?: string;
  disabled?: boolean;
  /**
   * props of [Fade](/?path=/docs/components-utils-fade)
   */
  fadeProps?: CSSTransitionProps;
  children: React.ComponentElement<HTMLElement, any>;
};

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    content,
    open: openProp = false,
    disableHoverListener = false,
    enterDelay = 0,
    leaveDelay = 0,
    positionPriority = ["top"],
    offset = [0, 10],
    width,
    disabled = false,
    fadeProps,
    children,
    ...rest
  },
  ref,
) {
  const { placements, isAuto } = usePlacement(positionPriority);
  const arrowRef = React.useRef(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const theme = useTheme();

  const {
    x,
    y,
    placement,
    refs: floatingRef,
    strategy,
    context,
  } = useFloating({
    placement: placements[0],
    open: open,
    onOpenChange: setOpen,
    middleware: [
      positionPriority.length > 0 && !isAuto
        ? flip({
            fallbackPlacements: placements,
          })
        : autoPlacement(),
      floatingOffset({
        mainAxis: offset[1],
        crossAxis: offset[0],
      }),
      shift({
        mainAxis: false,
      }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: !disableHoverListener,
    move: false,
    delay: {
      open: enterDelay,
      close: leaveDelay,
    },
  });
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    role,
  ]);

  const childrenProps = {
    ...children.props,
    ...getReferenceProps(),
    ref: useMergeRefs(floatingRef.setReference, children.ref),
  };

  const refs = useMergeRefs<HTMLDivElement>(ref, floatingRef.setFloating);

  return (
    <>
      {React.cloneElement(children, childrenProps)}
      {!disabled && (
        <FloatingDelayGroup delay={{ open: 10000, close: 200 }}>
          <FloatingPortal>
            <Fade
              in={open || openProp}
              unmountOnExit={true}
              mountOnEnter={true}
              {...fadeProps}
            >
              <Styled.Tooltip
                ref={refs}
                style={{
                  position: strategy,
                  top: y,
                  left: x,
                }}
                {...rest}
                {...getFloatingProps()}
                width={width}
              >
                {content}
                <FloatingArrow
                  ref={arrowRef}
                  fill={theme.palette.black}
                  context={context}
                  width={8}
                  height={8}
                  staticOffset={(() => {
                    if (
                      [
                        "top-start",
                        "top-end",
                        "bottom-start",
                        "bottom-end",
                      ].includes(placement)
                    ) {
                      return "10%";
                    }
                    if (
                      [
                        "bottom-start",
                        "bottom-end",
                        "left-start",
                        "left-end",
                      ].includes(placement)
                    )
                      return "30%";
                    return undefined;
                  })()}
                />
              </Styled.Tooltip>
            </Fade>
          </FloatingPortal>
        </FloatingDelayGroup>
      )}
    </>
  );
});

export default Tooltip;
