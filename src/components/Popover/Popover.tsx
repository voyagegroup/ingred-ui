import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { usePopper } from "react-popper";
import Modal from "../Modal";

type Props = React.ComponentPropsWithRef<"div"> & {
  baseElement: HTMLElement | null;
  positionPriority?: PopperJS.Placement[];
  children: React.ReactNode;
};

const Popover: React.FunctionComponent<Props> = ({
  baseElement,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
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
    ],
  });

  return (
    <Modal>
      <Styled.Container
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        {...rest}
      >
        {children}
      </Styled.Container>
    </Modal>
  );
};

export default Popover;
