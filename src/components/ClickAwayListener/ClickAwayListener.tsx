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
  const bubbledEventTarget = React.useRef<EventTarget | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log("target", event.target);
      console.log("bubbled", bubbledEventTarget.current);
      if (
        childrenRef.current == null ||
        childrenRef.current.contains(event.target as Node) ||
        bubbledEventTarget.current === event.target
      ) {
        return;
      }
      if (onClickAway) onClickAway(event);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [childrenRef, onClickAway]);

  const handleBubbledEvents = (event: MouseEvent) => {
    bubbledEventTarget.current = event.target;
    if (children.props.onClick) {
      children.props.onClick(event);
    }
  };

  const childrenProps = {
    ...children.props,
    ref: useMergeRefs(childrenRef, children.ref),
    onClick: handleBubbledEvents,
  };

  return React.cloneElement(children, childrenProps);
};

export default ClickAwayListener;
