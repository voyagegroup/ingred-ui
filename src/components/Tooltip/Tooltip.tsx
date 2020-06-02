import * as React from "react";
import * as PopperJS from "@popperjs/core";
import { CSSTransition } from "react-transition-group";
import { usePopper } from "react-popper";
import * as Styled from "./styled";
import Portal from "../Portal";
import { useMergeRefs } from "../../hooks/useMergeRefs";

type Props = {
  content: React.ReactChild;
  open?: boolean;
  disableHoverListener?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  positionPriority?: PopperJS.Placement[];
  offset?: [number, number];
  width?: string;
  disable?: boolean;
  children: React.ComponentElement<HTMLElement, any>;
};

const Tooltip: React.FC<Props> = ({
  content,
  open: openProp = false,
  disableHoverListener = false,
  enterDelay = 0,
  leaveDelay = 0,
  positionPriority = ["top"],
  offset = [0, 10],
  width,
  disable = false,
  children,
}) => {
  /* eslint-disable prettier/prettier */
  const [baseElement, setBaseElement] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null);
  /* eslint-enable prettier/prettier */
  const [open, setOpen] = React.useState<boolean>(false);

  const [openTimer, setOpenTimer] = React.useState<number>(0);
  const [closeTimer, setCloseTimer] = React.useState<number>(0);

  React.useEffect(() => {
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, [openTimer, closeTimer]);

  const { styles, attributes } = usePopper(baseElement, popperElement, {
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
  });

  const onHandleEnter = (event: React.MouseEvent<HTMLElement>) => {
    setBaseElement(event.currentTarget);
    clearTimeout(closeTimer);
    if (!disableHoverListener) {
      if (enterDelay) {
        setOpenTimer(
          setTimeout(() => {
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

  const onHandleLeave = (event: React.MouseEvent<HTMLElement>) => {
    clearTimeout(openTimer);
    if (!disableHoverListener) {
      if (leaveDelay) {
        setCloseTimer(
          setTimeout(() => {
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

  const childrenProps = {
    ...children.props,
    onMouseEnter: onHandleEnter,
    onMouseLeave: onHandleLeave,
    ref: useMergeRefs(setBaseElement, children.ref as any),
  };

  return (
    <>
      {React.cloneElement(children, childrenProps)}
      {!disable && (
        <Portal>
          <CSSTransition
            in={open || openProp}
            classNames={Styled.transitionClass}
            unmountOnExit={true}
            mountOnEnter={true}
            timeout={1000}
          >
            <Styled.Tooltip
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              width={width}
            >
              {content}
              <Styled.Arrow
                ref={setArrowElement}
                data-popper-arrow
                style={styles.arrow}
              />
            </Styled.Tooltip>
          </CSSTransition>
        </Portal>
      )}
    </>
  );
};

export default Tooltip;
