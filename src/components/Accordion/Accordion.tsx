import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const [expandedState, setExpandedState] = useState(expanded);
  const accordionContentContainerRef = useRef<HTMLDivElement>(null);

  const height = useMemo(() => {
    if (expandedState && accordionContentContainerRef.current) {
      return accordionContentContainerRef.current.scrollHeight;
    }
    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedState, accordionContentContainerRef.current]);

  const handleChange = (event: React.SyntheticEvent, expanded: boolean) => {
    setExpandedState(expanded);
    onChange && onChange(event, expanded);
  };

  useEffect(() => {
    setExpandedState(expanded);
  }, [expanded]);

  return (
    <div ref={ref} {...rest}>
      <Styled.AccordionTitle
        display="flex"
        expanded={expandedState}
        disabled={disabled}
        // eslint-disable-next-line react/jsx-handler-names
        onClick={(event) => {
          handleChange(event, !expandedState);
        }}
      >
        <Styled.AccordionTitleChildren>{title}</Styled.AccordionTitleChildren>
        <Styled.DropdownIndicator>
          <Styled.IconButton expanded={expandedState}>
            <Icon name="arrow_bottom" size="md" color="black" />
          </Styled.IconButton>
        </Styled.DropdownIndicator>
      </Styled.AccordionTitle>
      <Styled.AccordionContent
        ref={accordionContentContainerRef}
        expanded={expandedState}
        height={height}
      >
        {children}
      </Styled.AccordionContent>
    </div>
  );
});

export default Accordion;
