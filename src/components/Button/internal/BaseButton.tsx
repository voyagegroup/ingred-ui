import styled from "styled-components";

export type Props = React.ComponentPropsWithRef<"button">;

export const BaseButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background-color: transparent;
  text-decoration: none;
  letter-spacing: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  cursor: pointer;
  outline: none;

  &:disabled {
    box-shadow: none;
    text-shadow: none;
    cursor: not-allowed;
  }
`;
