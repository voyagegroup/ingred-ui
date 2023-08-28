import { Placement } from "@floating-ui/core";
import * as React from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import * as Styled from "./styled";
import {
  useFloating,
  autoUpdate,
  offset as floatingOffset,
  shift,
  FloatingFocusManager,
  useRole,
  useInteractions,
  autoPlacement,
  flip,
} from "@floating-ui/react";
import Modal, { ModalProps } from "../Modal";
import { usePlacement, AutoPlacement } from "../../hooks/usePlacement";

export type PopoverProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * If `false`, children becomes `visibility: hidden`.
   */
  isOpen?: boolean;
  onClose?: ModalProps["onClose"];
  baseElement: HTMLElement | null;
  /**
   * Define priority of position. Please check [this](https://floating-ui.com/docs/tutorial#placements).
   * If not specified, it will be auto.
   */
  positionPriority?: (Placement | AutoPlacement)[];
  offset?: [number, number];
  /**
   * props of [Modal](/?path=/docs/components-utils-modal)
   */
  modalProps?: Partial<ModalProps>;
  children: React.ComponentElement<HTMLElement, any>;
};

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    isOpen = true,
    onClose,
    baseElement,
    offset = [0, 0],
    positionPriority = ["auto"],
    modalProps,
    children,
    ...rest
  },
  ref,
) {
  const { placements, isAuto } = usePlacement(positionPriority);
  const {
    x,
    y,
    refs: floatingRef,
    strategy,
    context,
  } = useFloating({
    elements: {
      reference: baseElement,
    },
    placement: placements[0],
    open: isOpen,
    middleware: [
      positionPriority.length > 0 && !isAuto
        ? flip({
            padding: 24,
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
    ],
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context);
  const { getFloatingProps } = useInteractions([role]);

  const refs = useMergeRefs<HTMLDivElement>(ref, floatingRef.setFloating);

  return (
    <Modal
      isOpen={isOpen}
      backdropProps={{ invisible: true }}
      {...modalProps}
      onClose={onClose}
    >
      <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
        <Styled.Container
          ref={refs}
          style={{
            position: strategy,
            top: y,
            left: x,
          }}
          {...getFloatingProps()}
          {...rest}
        >
          {children}
        </Styled.Container>
      </FloatingFocusManager>
    </Modal>
  );
});

export default Popover;
