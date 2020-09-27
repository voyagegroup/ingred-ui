import styled from "styled-components";

export const Arrow = styled.div`
  z-index: -1;
  &:after {
    content: " ";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.palette.black};
  }
`;

export const Tooltip = styled.div<{ width?: string }>`
  display: flex;
  align-items: center;
  align-content: center;
  width: ${({ width }) => width || "auto"};
  padding: ${({ theme }) => `${theme.spacing * 0.75}px ${theme.spacing}px`};
  border-radius: ${({ theme }) => theme.radius}px;
  color: ${({ theme }) => theme.palette.white};
  background-color: ${({ theme }) => theme.palette.black};
  font-weight: bold;
  font-size: 12px;
  z-index: ${({ theme }) => theme.depth.tooltip};

  &[data-popper-placement^="top"] > ${Arrow} {
    bottom: 0;
    &:after {
      top: -5px;
      transform: translateX(-50%) rotate(45deg)
        skew(calc((30deg) / 2), calc((30deg) / 2));
    }
  }

  &[data-popper-placement^="bottom"] > ${Arrow} {
    top: 0;
    &:after {
      bottom: -5px;
      transform: translateX(-50%) rotate(45deg)
        skew(calc((30deg) / 2), calc((30deg) / 2));
    }
  }

  &[data-popper-placement^="right"] > ${Arrow} {
    left: 0;
    &:after {
      right: -5px;
      transform: translateY(-50%) rotate(-45deg)
        skew(calc((30deg) / 2), calc((30deg) / 2));
    }
  }

  &[data-popper-placement^="left"] > ${Arrow} {
    right: 0;
    &:after {
      left: -5px;
      transform: translateY(-50%) rotate(-45deg)
        skew(calc((30deg) / 2), calc((30deg) / 2));
    }
  }
`;
