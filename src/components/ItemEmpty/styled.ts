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
  svg {
    display: block;
    width: ${({ imageWidth, imageHeight }) => {
      if (imageWidth) {
        return `${imageWidth}px`;
      } else if (imageHeight) {
        return "auto";
      } else {
        return "137px"; // imageHeightとimageWidthが両方 auto だとアイコンが消える
      }
    }};
    height: ${({ imageHeight }) => (imageHeight ? `${imageHeight}px` : "auto")};
  }
`;
