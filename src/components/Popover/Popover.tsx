import { type Placement } from "@floating-ui/core";
import * as React from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import * as Styled from "./styled";
import {
  useFloating,
  autoUpdate,
  offset as floatingOffset,
  shift,
  FloatingFocusManager,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  autoPlacement,
  flip,
} from "@floating-ui/react";

export type PopoverProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * If `false`, this component return `null`.
   */
  isOpen?: boolean;
  onClose?: (open: boolean) => void;
  /**
   * That becomes position reference of this component.
   */
  baseElement: HTMLElement | null;
  /**
   * Define priority of position. Please check [this](https://floating-ui.com/docs/flip#fallbackplacements).
   * If not specified, it will be auto.
   */
  positionPriority?: Placement[];
  offset?: [number, number];
  children: React.ComponentElement<HTMLElement, any>;
};

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      isOpen = false,
      onClose,
      baseElement,
      offset = [0, 0],
      positionPriority = ["left"],
      children,
      ...rest
    },
    ref,
  ) => {
    const {
      x,
      y,
      refs: floatingRef,
      strategy,
      context,
    } = useFloating({
      placement: positionPriority[0],
      open: isOpen,
      onOpenChange: onClose,
      middleware: [
        positionPriority.length > 0
          ? flip({
              padding: 24,
              fallbackPlacements: positionPriority,
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

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getFloatingProps } = useInteractions([click, dismiss, role]);

    React.useEffect(() => {
      floatingRef.setReference(baseElement);
    }, [baseElement, floatingRef]);

    const refs = useMergeRefs<HTMLDivElement>(ref, floatingRef.setFloating);

    if (!isOpen) {
      return null;
    }

    return (
      <FloatingFocusManager context={context} modal={false}>
        <Styled.Container
          ref={refs}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
          {...rest}
        >
          {children}
        </Styled.Container>
      </FloatingFocusManager>
    );
  },
);

export default Popover;
