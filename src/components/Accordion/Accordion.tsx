import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme } from "../../themes";
import Icon from "../Icon";
import * as Styled from "./styled";

export type AccordionProps = {
  title: ReactNode;
  expanded?: boolean;
  disabled?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  children: ReactNode | ReactNode[];
};

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { title, expanded = false, disabled = false, onChange, children, ...rest },
  ref,
) {
  const theme = useTheme();
  const [expandedState, setExpandedState] = useState(expanded);
  const [height, setHeight] = useState<`${number}px` | "auto">("0px");
  const [overflow, setOverflow] = useState<"hidden" | "visible">("hidden");
  const accordionContentContainerRef = useRef<HTMLDivElement>(null);

  const setContentStyle = (expanded: boolean) => {
    if (expanded) {
      setHeight(`${accordionContentContainerRef.current?.scrollHeight ?? 0}px`);
    } else {
      setHeight(`${accordionContentContainerRef.current?.scrollHeight ?? 0}px`);
      setOverflow("hidden");
      setTimeout(() => setHeight("0px"), 100);
    }
  };

  const handleChange = (event: React.SyntheticEvent, expanded: boolean) => {
    setExpandedState(expanded);
    setContentStyle(expanded);
    onChange && onChange(event, expanded);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    handleChange(event, !expandedState);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleChange(event, !expandedState);
    }
  };

  const handleTransitionEnd = () => {
    if (expandedState) {
      setHeight("auto");
      setOverflow("visible");
    }
  };

  useEffect(() => {
    setExpandedState(expanded);
    setContentStyle(expanded);
  }, [expanded]);

  return (
    <Styled.Container ref={ref} {...rest}>
      <Styled.AccordionTitle
        display="flex"
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={expandedState}
        aria-controls={`accordion-content-${title}`}
        expanded={expandedState}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <Styled.AccordionTitleChildren>{title}</Styled.AccordionTitleChildren>
        <Styled.DropdownIndicator>
          <Styled.IconButton expanded={expandedState}>
            <Icon
              name="arrow_bottom"
              size="md"
              color={disabled ? theme.palette.text.disabled : "black"}
            />
          </Styled.IconButton>
        </Styled.DropdownIndicator>
      </Styled.AccordionTitle>
      <Styled.AccordionContent
        ref={accordionContentContainerRef}
        height={height}
        overflow={overflow}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </Styled.AccordionContent>
    </Styled.Container>
  );
});

export default Accordion;
