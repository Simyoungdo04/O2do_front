import styled from "styled-components";

export const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  gap: 14px;
  height: 64px;
  padding: 0 24px;

  background: ${({ theme }) => theme.color.headerBg};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const Logo = styled.h1`
  font-size: 24px;
  font-weight: 800;

  color: ${({ theme }) => theme.color.point};
  cursor: pointer;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 32px;
  height: 32px;
  padding: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.color.bgSoft};
  }
`;

export const Bar = styled.span`
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 2px;
  background: ${({ theme }) => theme.color.headerText};
`;

export const LoginBtn = styled.button`
  padding: 8px 16px;

  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.color.point};
  background: transparent;
  color: ${({ theme }) => theme.color.point};

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.pointSoft};
  }
`;
