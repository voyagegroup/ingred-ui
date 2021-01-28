import * as React from "react";
import styled from "styled-components";
import Portal from "./Portal";

const Box = styled.div`
  padding: ${({ theme }) => theme.spacing}px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;

export default {
  title: "Components/Utils/Portal",
  component: Portal,
};

export const Overview = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {show ? "Unmount children" : "Mount children"}
      </button>
      <Box>
        It looks like I will render here.
        {show ? (
          <Portal container={container.current || undefined}>
            <span>
              But I actually render here! ※See the &rdquo;Story&rdquo; tab in
              footer
            </span>
          </Portal>
        ) : null}
      </Box>
      <Box ref={container} />
    </div>
  );
};
