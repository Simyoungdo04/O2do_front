import styled from "styled-components";

export const Main = styled.main`
  max-width: 480px;
  margin: 50px auto;
  padding: 32px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const PageTitle = styled.h2`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.color.text};
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.color.sub};
`;

export const InfoValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`;

export const DangerZone = styled.div`
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DangerTitle = styled.h3`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.sub};
`;

export const DangerText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.sub};
`;

export const WithdrawButton = styled.button`
  align-self: flex-start;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.color.danger};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.danger};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color.dangerSoft};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
