import styled from "styled-components";
import { DefaultToastContainer } from "../../../../../lib/react-toast-notification/src";

export const ToastContainer = styled(DefaultToastContainer)`
  z-index: ${({ theme }) => theme.depth.toast} !important;
`;
