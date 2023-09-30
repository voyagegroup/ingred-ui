import styled from "styled-components";

export const UnselectedList = styled.ul`
  width: 50%;
`;

export const UnselectedItem = styled.li`
  padding: 8px;
  list-style: none;
  border-bottom: 1px solid #000;
  justify-content: space-between;
`;

export const SelectedList = styled.ul`
  width: 50%;
`;

export const SelectedItem = styled.li`
  padding: 8px;
  display: flex;
  border-bottom: 1px solid #000;
  justify-content: space-between;
`;
