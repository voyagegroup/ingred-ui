import * as React from "react";
import * as ReactDOM from "react-dom";

type Props = {
  container?: HTMLElement;
  disablePortal?: boolean;
};

const Portal: React.FunctionComponent<Props> = ({
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
