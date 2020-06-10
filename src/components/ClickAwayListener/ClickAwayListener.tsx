import * as React from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";

type Props = {
  onClickAway: (event: MouseEvent) => void;
  children: React.ComponentElement<HTMLElement, any>;
};

const ClickAwayListener: React.FunctionComponent<Props> = ({
  onClickAway,
  children,
}) => {
  const childrenRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        childrenRef.current != null &&
        !childrenRef.current.contains(event.target as Node)
      ) {
        onClickAway(event);
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
