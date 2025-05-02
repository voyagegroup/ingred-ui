import * as React from "react";
import { FloatingTip } from "../../../../../src/components";

const FloatingTipSample: React.FC = () => {
  const [
    baseElement,
    setBaseElement,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleIsOpen = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };
  return (
    <>
      <button ref={setBaseElement} onClick={handleIsOpen(!isOpen)}>
        Click me!!
      </button>
      <FloatingTip
        baseElement={baseElement}
        isOpen={isOpen}
        onClose={handleIsOpen(false)}
      >
        Content
      </FloatingTip>
    </>
  );
};

export default FloatingTipSample;
