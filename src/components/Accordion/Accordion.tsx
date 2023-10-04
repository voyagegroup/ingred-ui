import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
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
  style?: React.CSSProperties;
};

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    title,
    expanded = false,
    disabled = false,
    style,
    onChange,
    children,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
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

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    handleChange(event, !expandedState);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleChange(event, !expandedState);
    }
  };

  useEffect(() => {
    setExpandedState(expanded);
  }, [expanded]);

  return (
    <div ref={ref} {...rest}>
      <Styled.AccordionTitle
        display="flex"
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={expandedState}
        aria-controls={`accordion-content-${title}`}
        expanded={expandedState}
        disabled={disabled}
        style={style}
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
        expanded={expandedState}
        height={height}
      >
        {children}
      </Styled.AccordionContent>
    </div>
  );
});

export default Accordion;
