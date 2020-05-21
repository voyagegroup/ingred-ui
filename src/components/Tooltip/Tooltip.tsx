import * as React from "react";
import * as PopperJS from "@popperjs/core";
import { usePopper } from "react-popper";
import * as Styled from "./styled";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { Portal } from "..";

type Props = {
  text: string;
  open?: boolean;
  disableHoverListener?: boolean;
  positionPriority?: PopperJS.Placement[];
  children: React.ReactElement;
};

const Tooltip: React.FC<Props> = ({
  text,
  open: openProp = false,
  disableHoverListener = false,
  positionPriority = ["left"],
  children,
}) => {
  /* eslint-disable prettier/prettier */
  const [baseElement, setBaseElement] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null);
  /* eslint-enable prettier/prettier */
  const [open, setOpen] = React.useState<boolean>(false);

  const { styles, attributes } = usePopper(baseElement, popperElement, {
    placement: positionPriority[0],
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
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

  const handleTooltipOpen = (open: boolean) => (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setBaseElement(event.currentTarget);
    if (!disableHoverListener) setOpen(open);
  };

  const childrenProps = {
    onMouseEnter: handleTooltipOpen(true),
    onMouseLeave: handleTooltipOpen(false),
    ...children.props,
    ref: useMergeRefs(setBaseElement, children.props.ref),
  };

  return (
    <>
      {React.cloneElement(children, childrenProps)}
      {(open || openProp) && (
        <Portal>
          <Styled.Tooltip
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {text}
            <Styled.Arrow
              ref={setArrowElement}
              data-popper-arrow
              style={styles.arrow}
            />
          </Styled.Tooltip>
        </Portal>
      )}
    </>
  );
};

export { Tooltip };
