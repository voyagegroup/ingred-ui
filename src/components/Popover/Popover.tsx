import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { usePopper } from "react-popper";
import Modal, { ModalProps } from "../Modal";
import { useMergeRefs } from "../../hooks/useMergeRefs";

export type PopoverProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * If `false`, children becomes `visibility: hidden`.
   */
  isOpen?: boolean;
  onClose?: ModalProps["onClose"];
  /**
   * That becomes position reference of this component.
   */
  baseElement: HTMLElement | null;
  /**
   * Define priority of position. Please check [this](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements).
   */
  positionPriority?: PopperJS.Placement[];
  offset?: [number, number];
  children: React.ComponentElement<HTMLElement, any>;
};

// TODO: Must decide detail transition (e.g. easing, transform-origin)
// MEMO: We will add transition to this component.
//       ref https://github.com/voyagegroup/ingred-ui/issues/191
//       ref e10d4db15b36488922651ee3128df89d3006f82f
const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      isOpen = true,
      onClose,
      baseElement,
      offset = [0, 0],
      positionPriority = ["auto"],
      children,
      ...rest
    },
    ref,
  ) => {
    const [popperElement, setPopperElement] =
      React.useState<HTMLDivElement | null>(null);

    const { styles, attributes, update } = usePopper(
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
      },
    );

    React.useEffect(() => {
      if (update !== null) {
        update();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const refs = useMergeRefs<HTMLDivElement>(ref, setPopperElement);

    return (
      <Modal
        isOpen={isOpen}
        backdropProps={{ invisible: true }}
        onClose={onClose}
      >
        <Styled.Container
          ref={refs}
          style={styles.popper}
          {...attributes.popper}
          {...rest}
        >
          {children}
        </Styled.Container>
      </Modal>
    );
  },
);

export default Popover;
