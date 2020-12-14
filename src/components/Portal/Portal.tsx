import * as React from "react";
import * as ReactDOM from "react-dom";

export type PortalProps = {
  /**
   * Base element that portal component renders.
   * If undefined it, Base element is `document.body`.
   */
  container?: HTMLElement;
  /**
   * If it is `true`, portal component renders as it is.
   */
  disablePortal?: boolean;
};

/**
 * The portal component renders its children into a new "subtree" outside of current DOM hierarchy.
 */
const Portal: React.FunctionComponent<PortalProps> = ({
  disablePortal = false,
  container,
  children,
}) => {
  const [mountNode, setMountNode] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setMountNode(container || document.body);
  }, [container]);

  if (disablePortal) {
    return (children as React.ReactElement) || null;
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : null;
};

export default Portal;
