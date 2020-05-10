import styled from "styled-components";
import Button from "../Button";

export const ButtonContainer = styled.div`
  display: inline-flex;
`;

export const MainButton = styled(Button)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

export const SplitToggle = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: 1px solid #054baf;
  padding: 0;
  min-width: 38px;
`;
