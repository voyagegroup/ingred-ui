import styled from "styled-components";
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
  &:disabled + span::before {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
  &:disabled + span::before {
    border: 1px solid ${({ theme }) => theme.palette.divider};
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  &:disabled:checked + span::before {
    background-image: ${({ indeterminate }) =>
      indeterminate
        ? `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMyIgdmlld0JveD0iMCAwIDEwIDMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxyZWN0IHk9IjAuMzk4OTI2IiB3aWR0aD0iMTAiIGhlaWdodD0iMi4yMDIwNSIgZmlsbD0iI0IzQkFDMSIvPiA8L3N2Zz4=') !important`
        : `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxwYXRoIGQ9Ik0zLjM2OTcgNy4xNTg5NEMzLjI1MjU1IDcuMDQxNzggMy4yNTI1NSA2Ljg1MTgzIDMuMzY5NyA2LjczNDY3TDEwLjAxNjUgMC4wODc4NjgxQzEwLjEzMzcgLTAuMDI5Mjg5MiAxMC4zMjM2IC0wLjAyOTI4OTQgMTAuNDQwOCAwLjA4Nzg2NzlMMTEuNTczNiAxLjIyMDY5QzExLjY5MDcgMS4zMzc4NSAxMS42OTA3IDEuNTI3OCAxMS41NzM2IDEuNjQ0OTVMNC45MjY3OSA4LjI5MTc2QzQuODA5NjMgOC40MDg5MSA0LjYxOTY4IDguNDA4OTEgNC41MDI1MiA4LjI5MTc2TDMuMzY5NyA3LjE1ODk0WiIgZmlsbD0iI0IzQkFDMSIvPiA8cGF0aCBkPSJNNC45MjY3OSA4LjI5MTc2QzQuODA5NjMgOC40MDg5MSA0LjYxOTY4IDguNDA4OTEgNC41MDI1MiA4LjI5MTc2TDAuOTMzMDgzIDQuNzIyMzJDMC44MTU5MjYgNC42MDUxNiAwLjgxNTkyNiA0LjQxNTIxIDAuOTMzMDgzIDQuMjk4MDVMMi4wNjU5IDMuMTY1MjNDMi4xODMwNiAzLjA0ODA3IDIuMzczMDEgMy4wNDgwNyAyLjQ5MDE3IDMuMTY1MjNMNi4wNTk2OCA2LjczNDc0QzYuMTc2ODQgNi44NTE5IDYuMTc2ODQgNy4wNDE4NSA2LjA1OTY4IDcuMTU5MDFMNC45MjY3OSA4LjI5MTc2WiIgZmlsbD0iI0IzQkFDMSIvPiA8L3N2Zz4=')`};
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
    box-shadow: ${({ theme }) => theme.shadow["3dShadowPrimary"]};
    background-color: ${({ theme }) => theme.palette.background.default};
    margin-right: ${({ hasChild, theme }) =>
      hasChild ? `${theme.spacing / 2}px` : "auto"};
    transition: background-color 0.3s ease;
  }
`;
