import styled from "styled-components";

export const AuthWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px 32px;
  background: #ffffff;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  text-align: center;
`;

export const AuthTitle = styled.h1`
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.font};
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.point};
`;

export const AuthSubTitle = styled.p`
  margin: 0 0 28px;
  font-family: ${({ theme }) => theme.font};
  font-size: 14px;
  color: ${({ theme }) => theme.color.sub};
`;

export const KakaoButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fee500;
  font-family: ${({ theme }) => theme.font};
  font-size: 15px;
  font-weight: 700;
  color: #191600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #fada0a;
  }
`;

export const StatusText = styled.p`
  font-family: ${({ theme }) => theme.font};
  font-size: 14px;
  color: ${({ theme }) => theme.color.sub};
`;

export const ErrorText = styled.p`
  margin: 0 0 20px;
  font-family: ${({ theme }) => theme.font};
  font-size: 14px;
  color: ${({ theme }) => theme.color.danger};
`;

export const BackButton = styled.button`
  height: 44px;
  padding: 0 20px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;
  font-family: ${({ theme }) => theme.font};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color.bgSoft};
    border-color: ${({ theme }) => theme.color.point};
    color: ${({ theme }) => theme.color.point};
  }
`;
