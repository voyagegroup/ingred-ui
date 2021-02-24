import styled from "styled-components";
import { DefaultToastContainer } from "react-toast-notifications";

export const ToastContainer = styled(DefaultToastContainer)`
  z-index: ${({ theme }) => theme.depth.toast} !important;
`;
