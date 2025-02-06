import styled from "styled-components";
import { fontSize } from "../Typography/Typography";
import { CheckboxSize } from "./Checkbox";

export const Checkbox = styled.input<{
  indeterminate: boolean;
  error: boolean;
  disabled: boolean;
  _size: CheckboxSize;
}>`
  opacity: 0;
  -webkit-appearance: none;
  appearance: none;
  position: absolute;

  // inputの状態に合わせたチェックアイコンのスタイルを
  // ここに書いているのは、スタイルの継承の都合が悪かったため
  &:checked + span::before {
    box-shadow: ${({ theme }) => theme.shadow["3dShadowPrimary"]};
    border-color: ${({ theme }) => theme.palette.primary.dark};
    background-color: ${({ theme }) => theme.palette.primary.main};
    background-image: ${({ indeterminate, _size }) =>
      // eslint-disable-next-line no-nested-ternary
      indeterminate
        ? // マイナスアイコン
          _size === CheckboxSize.SMALL
          ? // チェックアイコン（小）
            `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMyIgdmlld0JveD0iMCAwIDEwIDMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxyZWN0IHg9IjAuNDU4OTg0IiB5PSIwLjUiIHdpZHRoPSI5LjA4MjUyIiBoZWlnaHQ9IjIuMDAwMDIiIHJ4PSIwLjMiIGZpbGw9IndoaXRlIi8+IDwvc3ZnPg==')`
          : // チェックアイコン（大）
            `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNCIgdmlld0JveD0iMCAwIDEwIDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxyZWN0IHk9IjAuODk4OTI2IiB3aWR0aD0iMTAiIGhlaWdodD0iMi4yMDIwNSIgcng9IjAuMyIgZmlsbD0id2hpdGUiLz4gPC9zdmc+')`
        : // チェックアイコン
        _size === CheckboxSize.SMALL
        ? // チェックアイコン（小）
          `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxwYXRoIGQ9Ik0yLjU5MTMgNi4yNDc0OUMyLjQ4OTY1IDYuMTQ1ODMgMi40ODk2NSA1Ljk4MTAyIDIuNTkxMyA1Ljg3OTM2TDguMzU4NTQgMC4xMTIxMjlDOC40NjAxOSAwLjAxMDQ3NTMgOC42MjUwMSAwLjAxMDQ3NTEgOC43MjY2NiAwLjExMjEyOUw5LjcwOTU4IDEuMDk1MDRDOS44MTEyMyAxLjE5NjcgOS44MTEyMyAxLjM2MTUxIDkuNzA5NTggMS40NjMxN0wzLjk0MjM0IDcuMjMwNEMzLjg0MDY5IDcuMzMyMDUgMy42NzU4NyA3LjMzMjA1IDMuNTc0MjIgNy4yMzA0TDIuNTkxMyA2LjI0NzQ5WiIgZmlsbD0id2hpdGUiLz4gPHBhdGggZD0iTTMuOTQyMzQgNy4yMzA0QzMuODQwNjkgNy4zMzIwNSAzLjY3NTg3IDcuMzMyMDUgMy41NzQyMiA3LjIzMDRMMC40NzcxMTkgNC4xMzMzQzAuMzc1NDY1IDQuMDMxNjUgMC4zNzU0NjUgMy44NjY4NCAwLjQ3NzExOSAzLjc2NTE4TDEuNDYwMDMgMi43ODIyN0MxLjU2MTY5IDIuNjgwNjEgMS43MjY1IDIuNjgwNjEgMS44MjgxNiAyLjc4MjI3TDQuOTI1MzEgNS44Nzk0MkM1LjAyNjk3IDUuOTgxMDggNS4wMjY5NyA2LjE0NTg5IDQuOTI1MzEgNi4yNDc1NUwzLjk0MjM0IDcuMjMwNFoiIGZpbGw9IndoaXRlIi8+IDwvc3ZnPg==')`
        : // チェックアイコン（大）
          `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxwYXRoIGQ9Ik0zLjM2OTcgNy4xNTg5NEMzLjI1MjU1IDcuMDQxNzggMy4yNTI1NSA2Ljg1MTgzIDMuMzY5NyA2LjczNDY3TDEwLjAxNjUgMC4wODc4NjgxQzEwLjEzMzcgLTAuMDI5Mjg5MiAxMC4zMjM2IC0wLjAyOTI4OTQgMTAuNDQwOCAwLjA4Nzg2NzlMMTEuNTczNiAxLjIyMDY5QzExLjY5MDcgMS4zMzc4NSAxMS42OTA3IDEuNTI3OCAxMS41NzM2IDEuNjQ0OTVMNC45MjY3OSA4LjI5MTc2QzQuODA5NjMgOC40MDg5MSA0LjYxOTY4IDguNDA4OTEgNC41MDI1MiA4LjI5MTc2TDMuMzY5NyA3LjE1ODk0WiIgZmlsbD0id2hpdGUiLz4gPHBhdGggZD0iTTQuOTI2NzkgOC4yOTE3NkM0LjgwOTYzIDguNDA4OTEgNC42MTk2OCA4LjQwODkxIDQuNTAyNTIgOC4yOTE3NkwwLjkzMzA4MyA0LjcyMjMyQzAuODE1OTI2IDQuNjA1MTYgMC44MTU5MjYgNC40MTUyMSAwLjkzMzA4MyA0LjI5ODA1TDIuMDY1OSAzLjE2NTIzQzIuMTgzMDYgMy4wNDgwNyAyLjM3MzAxIDMuMDQ4MDcgMi40OTAxNyAzLjE2NTIzTDYuMDU5NjggNi43MzQ3NEM2LjE3Njg0IDYuODUxOSA2LjE3Njg0IDcuMDQxODUgNi4wNTk2OCA3LjE1OTAxTDQuOTI2NzkgOC4yOTE3NloiIGZpbGw9IndoaXRlIi8+IDwvc3ZnPg==')`};
    background-repeat: no-repeat;
    background-position: center center;
  }
  &:disabled + span::before {
    border: 1px solid ${({ theme }) => theme.palette.divider};
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  &:disabled:checked + span::before {
    box-shadow: ${({ theme }) => theme.shadow["3dShadowBasic"]};
    background-image: ${({ indeterminate, _size }) =>
      // eslint-disable-next-line no-nested-ternary
      indeterminate
        ? // マイナスアイコン（disabled）
          _size === CheckboxSize.SMALL
          ? // マイナスアイコン（disabled, 小）
            `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMyIgdmlld0JveD0iMCAwIDEwIDMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxyZWN0IHg9IjAuNDU4OTg0IiB5PSIwLjUiIHdpZHRoPSI5LjA4MjUyIiBoZWlnaHQ9IjIuMDAwMDIiIGZpbGw9IiNCM0JBQzEiLz4gPC9zdmc+')`
          : // マイナスアイコン（disabled, 大）
            `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMyIgdmlld0JveD0iMCAwIDEwIDMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxyZWN0IHk9IjAuMzk4OTI2IiB3aWR0aD0iMTAiIGhlaWdodD0iMi4yMDIwNSIgZmlsbD0iI0IzQkFDMSIvPiA8L3N2Zz4=')`
        : // チェックアイコン（disabled）
        _size === CheckboxSize.SMALL
        ? // チェックアイコン（disabled, 小）
          `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxwYXRoIGQ9Ik0yLjU5MTMgNi4yNDc0OUMyLjQ4OTY1IDYuMTQ1ODMgMi40ODk2NSA1Ljk4MTAyIDIuNTkxMyA1Ljg3OTM2TDguMzU4NTQgMC4xMTIxMjlDOC40NjAxOSAwLjAxMDQ3NTMgOC42MjUwMSAwLjAxMDQ3NTEgOC43MjY2NiAwLjExMjEyOUw5LjcwOTU4IDEuMDk1MDRDOS44MTEyMyAxLjE5NjcgOS44MTEyMyAxLjM2MTUxIDkuNzA5NTggMS40NjMxN0wzLjk0MjM0IDcuMjMwNEMzLjg0MDY5IDcuMzMyMDUgMy42NzU4NyA3LjMzMjA1IDMuNTc0MjIgNy4yMzA0TDIuNTkxMyA2LjI0NzQ5WiIgZmlsbD0iI0IzQkFDMSIvPiA8cGF0aCBkPSJNMy45NDIzNCA3LjIzMDRDMy44NDA2OSA3LjMzMjA1IDMuNjc1ODcgNy4zMzIwNSAzLjU3NDIyIDcuMjMwNEwwLjQ3NzExOSA0LjEzMzNDMC4zNzU0NjUgNC4wMzE2NSAwLjM3NTQ2NSAzLjg2Njg0IDAuNDc3MTE5IDMuNzY1MThMMS40NjAwMyAyLjc4MjI3QzEuNTYxNjkgMi42ODA2MSAxLjcyNjUgMi42ODA2MSAxLjgyODE2IDIuNzgyMjdMNC45MjUzMSA1Ljg3OTQyQzUuMDI2OTcgNS45ODEwOCA1LjAyNjk3IDYuMTQ1ODkgNC45MjUzMSA2LjI0NzU1TDMuOTQyMzQgNy4yMzA0WiIgZmlsbD0iI0IzQkFDMSIvPiA8L3N2Zz4=')`
        : // チェックアイコン（disabled, 大）
          `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxwYXRoIGQ9Ik0zLjM2OTcgNy4xNTg5NEMzLjI1MjU1IDcuMDQxNzggMy4yNTI1NSA2Ljg1MTgzIDMuMzY5NyA2LjczNDY3TDEwLjAxNjUgMC4wODc4NjgxQzEwLjEzMzcgLTAuMDI5Mjg5MiAxMC4zMjM2IC0wLjAyOTI4OTQgMTAuNDQwOCAwLjA4Nzg2NzlMMTEuNTczNiAxLjIyMDY5QzExLjY5MDcgMS4zMzc4NSAxMS42OTA3IDEuNTI3OCAxMS41NzM2IDEuNjQ0OTVMNC45MjY3OSA4LjI5MTc2QzQuODA5NjMgOC40MDg5MSA0LjYxOTY4IDguNDA4OTEgNC41MDI1MiA4LjI5MTc2TDMuMzY5NyA3LjE1ODk0WiIgZmlsbD0iI0IzQkFDMSIvPiA8cGF0aCBkPSJNNC45MjY3OSA4LjI5MTc2QzQuODA5NjMgOC40MDg5MSA0LjYxOTY4IDguNDA4OTEgNC41MDI1MiA4LjI5MTc2TDAuOTMzMDgzIDQuNzIyMzJDMC44MTU5MjYgNC42MDUxNiAwLjgxNTkyNiA0LjQxNTIxIDAuOTMzMDgzIDQuMjk4MDVMMi4wNjU5IDMuMTY1MjNDMi4xODMwNiAzLjA0ODA3IDIuMzczMDEgMy4wNDgwNyAyLjQ5MDE3IDMuMTY1MjNMNi4wNTk2OCA2LjczNDc0QzYuMTc2ODQgNi44NTE5IDYuMTc2ODQgNy4wNDE4NSA2LjA1OTY4IDcuMTU5MDFMNC45MjY3OSA4LjI5MTc2WiIgZmlsbD0iI0IzQkFDMSIvPiA8L3N2Zz4=')`};
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
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  color: ${({ error }) =>
    error
      ? ({ theme }) => theme.palette.danger.main
      : ({ theme }) => theme.palette.black};
  font-size: ${({ size }) =>
    size === CheckboxSize.SMALL ? `${fontSize.sm}px` : `${fontSize.md}px`};
  &:disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
  &::before {
    flex-shrink: 0;
    content: "";
    aspect-ratio: 1;
    width: ${({ size }) => (size === CheckboxSize.SMALL ? "16px" : "18px")};
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.palette.danger.main : theme.palette.divider};
    border-radius: ${({ theme }) => theme.radius * 0.5}px;
    box-shadow: ${({ theme }) => theme.shadow["3dShadowBasic"]};
    background-color: ${({ theme }) => theme.palette.background.default};
    margin-right: ${({ hasChild, theme }) =>
      hasChild ? `${theme.spacing / 2}px` : "auto"};
    transition: background-color 0.3s ease;
  }
`;
