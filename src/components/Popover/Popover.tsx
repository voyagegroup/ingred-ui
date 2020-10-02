import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { usePopper } from "react-popper";
import Modal, { ModalProps } from "../Modal";
import Grow from "../Grow";
import {
  CSSTransitionProps,
  TransitionComponent,
} from "../../utils/reactTransitionGroupUtils";

export type PopoverProps = React.ComponentPropsWithRef<"div"> & {
  isOpen?: boolean;
  onClose?: ModalProps["onClose"];
  baseElement: HTMLElement | null;
  positionPriority?: PopperJS.Placement[];
  offset?: [number, number];
  TransitionComponent?: TransitionComponent;
  transitionProps?: CSSTransitionProps;
  transitionDuration?: number;
  children: React.ComponentElement<HTMLElement, any>;
};

const Popover: React.FunctionComponent<PopoverProps> = ({
  isOpen = true,
  onClose,
  baseElement,
  offset = [0, 0],
  positionPriority = ["auto"],
  TransitionComponent = Grow,
  transitionProps = {},
  transitionDuration,
  children,
  ...rest
}) => {
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);

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
          padding: 24,
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
        name: "computeStyles",
        options: {
          gpuAcceleration: false, // MEMO: To disable override CSS property "transform"
        },
      },
    ],
  });

  return (
    <Modal
      isOpen={isOpen}
      backdropProps={{ invisible: true }}
      onClose={onClose}
    >
      <TransitionComponent
        in={isOpen}
        {...transitionProps}
        timeout={transitionDuration || transitionProps.timeout}
      >
        <Styled.Container
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          {...rest}
        >
          {children}
        </Styled.Container>
      </TransitionComponent>
    </Modal>
  );
};

export default Popover;
