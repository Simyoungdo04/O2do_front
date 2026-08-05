import styled from "styled-components";

export const Spacer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ErrSpace = styled(Spacer)`
  align-items: center;
  justify-content: center;
`;

export const ErrMsg = styled.h1`
  font-size: 40px;
  font-weight: 700;

  color: ${({ theme }) => theme.color.danger};
`;
