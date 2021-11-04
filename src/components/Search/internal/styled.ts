import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  text-align: center;
`;

const util = `
position: absolute;
top: 50%;
left: 50%;
transform: translateY(-50%) translateX(-50%);
`;

export const NoResultMessageContainer = styled.div`
  ${util}
`;
export const EmptyMessageContainer = styled.div`
  ${util}
  display: flex;
`;

export const BoldTextContainer = styled.p`
  font-size: 1rem;
  font-weight: 800;
`;

export const TextContainer = styled.p`
  font-size: 1rem;
`;

export const AContainer = styled.a`
  color: ${({ theme }) => theme.palette.black};
  text-decoration: none;
`;

export const ContentTextContainer = styled.p`
  margin: 12px 0;
  padding: 8px;
  font-size: 1rem;
  border-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => `${theme.palette.gray.light}`};
    transition: 0.5s;
  }
`;

export const UnderLineContainer = styled.div`
  height: 0.1px;
  background-color: ${({ theme }) => `${theme.palette.gray.light}`};
`;
