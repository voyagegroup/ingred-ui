import * as React from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";

export type ClickAwayListenerProps = {
  onClickAway?: (event: MouseEvent) => void;
  children: React.ComponentElement<HTMLElement, any>;
};

const ClickAwayListener: React.FunctionComponent<ClickAwayListenerProps> = ({
  onClickAway,
  children,
}) => {
  const childrenRef = React.useRef<HTMLElement>(null);
  const mountedRef = React.useRef(false);

  /**
   * Prevents the bubbled event from getting triggered immediately
   * https://github.com/facebook/react/issues/20074
   */
  React.useEffect(() => {
    setTimeout(() => {
      mountedRef.current = true;
    }, 0);

    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!mountedRef.current) return;

      if (
        childrenRef.current != null &&
        !childrenRef.current.contains(event.target as Node)
      ) {
        if (onClickAway) onClickAway(event);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [childrenRef, onClickAway]);

  const childrenProps = {
    ...children.props,
    ref: useMergeRefs(childrenRef, children.ref),
  };

  return React.cloneElement(children, childrenProps);
};

export default ClickAwayListener;
