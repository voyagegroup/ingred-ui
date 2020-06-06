import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { usePopper } from "react-popper";
import MenuList, { ContentProp } from "../MenuList/MenuList";
import Portal from "../Portal";

type Props = React.ComponentPropsWithRef<"div"> & {
  baseElement: HTMLElement | null;
  contents: ContentProp[];
  positionPriority?: PopperJS.Placement[];
};

const Menu: React.FunctionComponent<Props> = ({
  baseElement,
  contents,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
  ...rest
}) => {
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(baseElement, popperElement, {
    placement: positionPriority[0],
    modifiers: [
      {
        name: "flip",
        options: {
          padding: 24,
          fallbackPlacements: positionPriority,
        },
      },
      {
        name: "preventOverflow",
        options: {
          mainAxis: false,
        },
      },
    ],
  });

  return (
    <Portal>
      <Styled.Container
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        {...rest}
      >
        <MenuList contents={contents} />
      </Styled.Container>
    </Portal>
  );
};

export default Menu;
