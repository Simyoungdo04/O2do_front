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
  background: ${({ theme }) => theme.color.surface};
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

export const AuthLogo = styled.h1`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.font};
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.text};

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.point};
    flex: none;
  }
`;

export const AuthSubTitle = styled.p`
  margin: 0 0 28px;
  font-family: ${({ theme }) => theme.font};
  font-size: 14px;
  color: ${({ theme }) => theme.color.sub};
`;

export const KakaoButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: 12px;
  background: none;
  cursor: pointer;
  overflow: hidden;
  line-height: 0;
  opacity: 1;
  transition: opacity 0.15s ease;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 48px;
  margin-top: 10px;
  border: 1px solid #747775;
  border-radius: 12px;
  background: #ffffff;
  font-family: ${({ theme }) => theme.font};
  font-size: 15px;
  font-weight: 500;
  color: #1f1f1f;
  cursor: pointer;
  transition: background 0.15s ease;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: #f8f8f8;
  }
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 18px;
`;

export const AuthFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
`;

export const AuthInput = styled.input`
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.surface};
  font-family: ${({ theme }) => theme.font};
  font-size: 15px;
  color: ${({ theme }) => theme.color.text};
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.color.sub};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.point};
  }
`;

export const AuthFieldError = styled.p`
  margin: 0;
  padding-left: 2px;
  font-family: ${({ theme }) => theme.font};
  font-size: 12px;
  color: ${({ theme }) => theme.color.danger};
`;

export const AuthHint = styled.p`
  margin: 0;
  padding-left: 2px;
  font-family: ${({ theme }) => theme.font};
  font-size: 12px;
  color: ${({ theme }) => theme.color.sub};
`;

export const AuthSubmitButton = styled.button`
  height: 48px;
  margin-top: 4px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.point};
  font-family: ${({ theme }) => theme.font};
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const AuthDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  font-family: ${({ theme }) => theme.font};
  font-size: 13px;
  color: ${({ theme }) => theme.color.sub};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.color.border};
  }
`;

export const AuthToggleText = styled.p`
  margin: 20px 0 0;
  font-family: ${({ theme }) => theme.font};
  font-size: 14px;
  color: ${({ theme }) => theme.color.sub};

  button {
    border: none;
    background: none;
    padding: 0;
    margin-left: 4px;
    font-family: inherit;
    font-size: inherit;
    font-weight: 700;
    color: ${({ theme }) => theme.color.point};
    cursor: pointer;
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
  background: ${({ theme }) => theme.color.surface};
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
