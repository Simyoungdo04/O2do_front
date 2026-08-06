import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 64px;
  padding: 0 24px;

  background: ${({ theme }) => theme.color.footerBg};
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

export const FooterLogo = styled.h2`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;

  color: ${({ theme }) => theme.color.footerText};

  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.point};
    flex: none;
  }
`;

export const FooterText = styled.p`
  font-size: 13px;

  color: ${({ theme }) => theme.color.footerText};
`;
