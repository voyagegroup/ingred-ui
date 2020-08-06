import styled from "styled-components";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing * 5}px
    ${({ theme }) => theme.spacing * 4}px ${({ theme }) => theme.spacing * 7}px;
`;

export const EmptyImageContainer = styled.div``;

type DefaultEmptyImageProps = {
  imageWidth?: number;
  imageHeight?: number;
};

export const DefaultEmptyImageContainer = styled.div<DefaultEmptyImageProps>`
  width: ${({ imageWidth }) => (imageWidth ? `${imageWidth}px` : "137px")};
  height: ${({ imageHeight }) => (imageHeight ? `${imageHeight}px` : "auto")};

  img {
    display: block;
    width: 100%;
  }
`;
