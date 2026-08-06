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
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;

  color: ${({ theme }) => theme.color.headerText};
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.point};
    flex: none;
  }
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

