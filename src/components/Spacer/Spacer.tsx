import styled from "styled-components";
import { SpacerProps, spacer } from "../../utils/spacer";

const Spacer = styled.div<SpacerProps>`
  ${({ theme }) => spacer({ ...theme, ...theme.spacing })}
`;

export default Spacer;
