import * as React from "react";
import { usePopper } from "react-popper";

type Props = React.ComponentPropsWithRef<"div"> & {
  show: boolean;
  baseElement: HTMLElement | null;
};

// TODO: Popperで表示される要素のz-indexを定義する
const Popper: React.FC<Props> = ({
  show = true,
  baseElement = null,
  children,
  ...rest
}) => {
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(baseElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "flip",
        options: {
          padding: { bottom: 24, right: 24 },
          fallbackPlacements: ["bottom-end", "top-start", "top-end"],
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

  return show ? (
    <div
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
      {...rest}
    >
      {children}
    </div>
  ) : null;
};

export { Popper };
