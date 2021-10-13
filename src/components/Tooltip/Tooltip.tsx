import * as React from "react";
import * as PopperJS from "@popperjs/core";
import { usePopper } from "react-popper";
import * as Styled from "./styled";
import Portal from "../Portal";
import Fade from "../Fade";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";

export type TooltipProps = React.ComponentPropsWithoutRef<"div"> & {
  content: React.ReactChild;
  open?: boolean;
  disableHoverListener?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  /**
   * Define priority of position. Please check [this](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements).
   */
  positionPriority?: PopperJS.Placement[];
  offset?: [number, number];
  width?: string;
  disabled?: boolean;
  /**
   * props of [Fade](/?path=/docs/components-utils-fade)
   */
  fadeProps?: CSSTransitionProps;
  children: React.ComponentElement<HTMLElement, any>;
};

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
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
  ) => {
    /* eslint-disable prettier/prettier */
  const [baseElement, setBaseElement] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null);
  /* eslint-enable prettier/prettier */
    const [open, setOpen] = React.useState<boolean>(false);
    const [openTimer, setOpenTimer] = React.useState<number | null>(null);
    const [closeTimer, setCloseTimer] = React.useState<number | null>(null);

    React.useEffect(() => {
      return () => {
        if (openTimer != null) clearTimeout(openTimer);
        if (closeTimer != null) clearTimeout(closeTimer);
      };
    }, [openTimer, closeTimer]);

    const { styles, attributes, state } = usePopper(
      baseElement,
      popperElement,
      {
        placement: positionPriority[0],
        modifiers: [
          {
            name: "offset",
            options: {
              offset,
            },
          },
          {
            name: "flip",
            options: {
              fallbackPlacements: positionPriority,
            },
          },
          {
            name: "preventOverflow",
            options: {
              mainAxis: false,
            },
          },
          {
            name: "arrow",
            options: {
              element: arrowElement,
              padding: 10,
            },
          },
        ],
      },
    );

    const handleEnter = (event: React.MouseEvent<HTMLElement>) => {
      setBaseElement(event.currentTarget);
      if (closeTimer != null) clearTimeout(closeTimer);
      if (!disableHoverListener) {
        if (enterDelay) {
          setOpenTimer(
            window.setTimeout(() => {
              setOpen(true);
            }, enterDelay),
          );
        } else {
          setOpen(true);
        }
      }
      if (children.props.onMouseEnter) {
        children.props.onMouseEnter(event);
      }
    };

    const handleLeave = (event: React.MouseEvent<HTMLElement>) => {
      if (openTimer != null) clearTimeout(openTimer);
      if (!disableHoverListener) {
        if (leaveDelay) {
          setCloseTimer(
            window.setTimeout(() => {
              setOpen(false);
            }, leaveDelay),
          );
        } else {
          setOpen(false);
        }
      }
      if (children.props.onMouseLeave) {
        children.props.onMouseLeave(event);
      }
    };

    // MEMO: Not to propergate mouseOver/mouseOut event that defined in children
    //       https://github.com/facebook/react/issues/11387
    const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    };

    const childrenProps = {
      ...children.props,
      onMouseEnter: handleEnter,
      onMouseLeave: handleLeave,
      ref: useMergeRefs(setBaseElement, children.ref),
    };

    const refs = useMergeRefs<HTMLDivElement>(ref, setPopperElement);

    return (
      <>
        {React.cloneElement(children, childrenProps)}
        {!disabled && (
          <Portal>
            <Fade
              in={open || openProp}
              unmountOnExit={true}
              mountOnEnter={true}
              {...fadeProps}
            >
              <Styled.Tooltip
                ref={refs}
                style={styles.popper}
                {...attributes.popper}
                // eslint-disable-next-line react/jsx-handler-names
                onMouseOver={stopPropagation}
                // eslint-disable-next-line react/jsx-handler-names
                onMouseOut={stopPropagation}
                {...rest}
                width={width}
              >
                {content}
                <Styled.Arrow
                  ref={setArrowElement}
                  data-popper-arrow
                  placement={state?.placement}
                  // MEMO: The following placements use popperJS default styles
                  style={
                    [
                      "auto",
                      "auto-start",
                      "auto-end",
                      "top",
                      "bottom",
                      "right",
                      "left",
                    ].includes(state?.placement || "")
                      ? styles.arrow
                      : undefined
                  }
                />
              </Styled.Tooltip>
            </Fade>
          </Portal>
        )}
      </>
    );
  },
);

export default Tooltip;
