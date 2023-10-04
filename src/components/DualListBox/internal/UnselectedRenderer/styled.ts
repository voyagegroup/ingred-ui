import styled from "styled-components";

export const Container = styled.ul`
  flex: 1;
`;

const UnselectedItemBase = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  list-style: none;
`;

export const UnselectedItem = styled(UnselectedItemBase)`
  padding: ${({ theme }) => theme.spacing * 2}px;
`;

export const AccordionWrapper = styled(UnselectedItemBase)`
  border-bottom: none;
`;

export const AccordionTitleWrapper = styled.div`
  padding-left: ${({ theme }) => theme.spacing / 2}px;
`;
