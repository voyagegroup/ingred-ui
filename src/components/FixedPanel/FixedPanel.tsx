import * as React from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import * as Styled from "./styled";

export type FixedPanelProps = {
  /**
   * If `false`, it is outside of viewport.
   */
  isOpen: boolean;
  placement?: "top" | "bottom";
  /**
   * Unit: `px`
   * Define distance from top/bottom.
   */
  offset?: number;
  children?: React.ReactNode;
};

const FixedPanel = React.forwardRef<HTMLDivElement, FixedPanelProps>(
  ({ isOpen, placement = "top", offset = 0, children }, ref) => {
    const [containerRef, setContainerRef] =
      React.useState<HTMLDivElement | null>(null);
    const refs = useMergeRefs<HTMLDivElement>(ref, setContainerRef);
    return (
      <Styled.Container
        ref={refs}
        height={containerRef?.clientHeight || 0}
        offset={offset}
        isOpen={isOpen}
        placement={placement}
      >
        {children}
      </Styled.Container>
    );
  },
);

export default FixedPanel;
