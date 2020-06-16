import styled, { DefaultTheme, StyledComponent } from "styled-components";
import {
  DefaultToastContainer,
  ToastContainerProps,
} from "react-toast-notifications";

// MEMO: おそらくstyled-component@5.x.xで型エラーが起こっているので、明示的に宣言している
export const ToastContainer: StyledComponent<
  React.ComponentType<ToastContainerProps>,
  DefaultTheme,
  {},
  never
> = styled(DefaultToastContainer)`
  z-index: ${({ theme }) => theme.depth.toast} !important;
`;
