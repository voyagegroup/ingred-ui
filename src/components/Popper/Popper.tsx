import * as React from "react";
import * as PopperJS from "@popperjs/core";
import { usePopper, Modifier } from "react-popper";
import Portal from "../Portal";

// Ref: react-popper/typings/react-popper.d.ts
export type PopperOptions = Omit<Partial<PopperJS.Options>, "modifiers"> & {
  createPopper?: typeof PopperJS.createPopper;
  modifiers?: ReadonlyArray<Modifier<any>>;
};

const defaultPopperOptions: PopperOptions = {
  placement: "bottom-start",
  modifiers: [
    {
      name: "flip",
      options: {
        padding: 24,
        fallbackPlacements: [
          "bottom-start",
          "bottom-end",
          "top-start",
          "top-end",
        ],
      },
    },
    {
      name: "preventOverflow",
      options: {
        mainAxis: false,
      },
    },
  ],
};

type Props = React.ComponentPropsWithRef<"div"> & {
  baseElement?: HTMLElement | null;
  popperOptions?: PopperOptions;
  disablePortal?: boolean;
};

const Popper: React.FC<Props> = ({
  baseElement = null,
  popperOptions = {},
  disablePortal = false,
  children,
  ...rest
}) => {
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(baseElement, popperElement, {
    ...defaultPopperOptions,
    ...popperOptions,
  });

  return (
    <Portal disablePortal={disablePortal}>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        {...rest}
      >
        {children}
      </div>
    </Portal>
  );
};

export default Popper;
