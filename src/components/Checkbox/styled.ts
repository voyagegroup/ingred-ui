import styled from "styled-components";
import { getShadow } from "../../utils/getShadow";
import { fontSize } from "../Typography/Typography";
import { CheckboxSize } from "./Checkbox";

export const Checkbox = styled.input<{
  indeterminate: boolean;
  error: boolean;
  disabled: boolean;
}>`
  opacity: 0;
  -webkit-appearance: none;
  appearance: none;
  position: absolute;

  &:checked + span::before {
    /* flex: 1 0 auto; */
    /* background */
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-color: ${({ theme }) => theme.palette.primary.dark};

    /* check icon */
    background-image: ${({ indeterminate }) =>
      indeterminate
        ? `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMyIgdmlld0JveD0iMCAwIDEwIDMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxyZWN0IHg9IjAuNDU4OTg0IiB5PSIwLjUiIHdpZHRoPSI5LjA4MjUyIiBoZWlnaHQ9IjIuMDAwMDIiIHJ4PSIwLjMiIGZpbGw9IndoaXRlIi8+IDwvc3ZnPg==')`
        : `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxwYXRoIGQ9Ik0yLjU5MTMgNi4yNDc0OUMyLjQ4OTY1IDYuMTQ1ODMgMi40ODk2NSA1Ljk4MTAyIDIuNTkxMyA1Ljg3OTM2TDguMzU4NTQgMC4xMTIxMjlDOC40NjAxOSAwLjAxMDQ3NTMgOC42MjUwMSAwLjAxMDQ3NTEgOC43MjY2NiAwLjExMjEyOUw5LjcwOTU4IDEuMDk1MDRDOS44MTEyMyAxLjE5NjcgOS44MTEyMyAxLjM2MTUxIDkuNzA5NTggMS40NjMxN0wzLjk0MjM0IDcuMjMwNEMzLjg0MDY5IDcuMzMyMDUgMy42NzU4NyA3LjMzMjA1IDMuNTc0MjIgNy4yMzA0TDIuNTkxMyA2LjI0NzQ5WiIgZmlsbD0id2hpdGUiLz4gPHBhdGggZD0iTTMuOTQyMzQgNy4yMzA0QzMuODQwNjkgNy4zMzIwNSAzLjY3NTg3IDcuMzMyMDUgMy41NzQyMiA3LjIzMDRMMC40NzcxMTkgNC4xMzMzQzAuMzc1NDY1IDQuMDMxNjUgMC4zNzU0NjUgMy44NjY4NCAwLjQ3NzExOSAzLjc2NTE4TDEuNDYwMDMgMi43ODIyN0MxLjU2MTY5IDIuNjgwNjEgMS43MjY1IDIuNjgwNjEgMS44MjgxNiAyLjc4MjI3TDQuOTI1MzEgNS44Nzk0MkM1LjAyNjk3IDUuOTgxMDggNS4wMjY5NyA2LjE0NTg5IDQuOTI1MzEgNi4yNDc1NUwzLjk0MjM0IDcuMjMwNFoiIGZpbGw9IndoaXRlIi8+IDwvc3ZnPg==')`};
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

export const Container = styled.label<{ disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
`;

export const Span = styled.span<{
  size: CheckboxSize;
  hasChild: boolean;
  indeterminate: boolean;
  error: boolean;
}>`
  display: inline-flex;
  align-items: center;
  color: ${({ error }) =>
    error
      ? ({ theme }) => theme.palette.danger.main
      : ({ theme }) => theme.palette.black};
  font-size: ${({ size }) =>
    size === CheckboxSize.SMALL ? `${fontSize.sm}px` : `${fontSize.md}px`};
  &::before {
    flex-shrink: 0;
    content: "";
    aspect-ratio: 1;
    width: ${({ size }) => (size === CheckboxSize.SMALL ? "16px" : "18px")};
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.palette.danger.main : theme.palette.divider};
    border-radius: ${({ theme }) => theme.radius * 0.5}px;
    box-shadow: ${({ theme }) =>
      getShadow(
        3,
        theme.palette.action.shadowOpacity,
        theme.palette.action.shadowBase,
      )};
    background-color: ${({ theme }) => theme.palette.background.default};
    margin-right: ${({ hasChild, theme }) =>
      hasChild ? `${theme.spacing / 2}px` : "auto"};
    transition: background-color 0.3s ease;
  }
  ${Checkbox}:disabled + & {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
  ${Checkbox}:disabled + &::before {
    border: 1px solid ${({ theme }) => theme.palette.divider};
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  ${Checkbox}:disabled:checked + &::before {
    background-image: ${({ indeterminate }) =>
      indeterminate
        ? `url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%223%22%20viewBox%3D%220%200%2010%203%22%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill%3A%23b3bac1%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Crect%20class%3D%22a%22%20width%3D%2210%22%20height%3D%223%22%20rx%3D%220.596%22%2F%3E%3C%2Fsvg%3E')`
        : `url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212.001%22%20height%3D%228.997%22%20viewBox%3D%220%200%2012.001%208.997%22%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill%3A%23b3bac1%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20class%3D%22a%22%20d%3D%22M405.681%2C343.44l-5.154%2C5.12-1.332%2C1.323a.622.622%2C0%2C0%2C1-.877%2C0l-1.333-1.323h0l-2.943-2.924a.612.612%2C0%2C0%2C1%2C0-.871l1.332-1.324a.624.624%2C0%2C0%2C1%2C.877%2C0l2.506%2C2.49%2C4.714-4.685a.624.624%2C0%2C0%2C1%2C.877%2C0l1.333%2C1.323A.614.614%2C0%2C0%2C1%2C405.681%2C343.44Z%22%20transform%3D%22translate(-393.861%20-341.066)%22%2F%3E%3C%2Fsvg%3E')`};
    background-repeat: no-repeat;
    background-position: center center;
  }
`;
