import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 18, 0.45);
  z-index: 40;

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition: opacity 0.2s ease, visibility 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  max-width: 82vw;
  background: ${({ theme }) => theme.color.headerBg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  z-index: 50;

  display: flex;
  flex-direction: column;

  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.22s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  flex-shrink: 0;
`;

export const PanelLogo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.text};

  &::before {
    content: "";
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.point};
    flex: none;
  }
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.color.sub};
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    background: ${({ theme }) => theme.color.bgSoft};
    color: ${({ theme }) => theme.color.text};
  }
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.bgSoft};
`;

export const StatValue = styled.span`
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.color.point};
  font-variant-numeric: tabular-nums;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.color.sub};
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
`;

export const NavItem = styled.button`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 12px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  font-size: 14.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.color.bgSoft};
  }
`;

export const Divider = styled.div`
  margin: 8px 20px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

export const ThemeSection = styled.div`
  padding: 4px 20px 16px;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.sub};
`;

export const ThemeDots = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ThemeDot = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${({ $active, theme }) => ($active ? theme.color.text : "transparent")};
  padding: 3px;
  background: transparent;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }
`;

export const Bottom = styled.div`
  margin-top: auto;
  padding: 16px 20px 20px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

export const LogoutButton = styled.button`
  width: 100%;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.danger};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color.dangerSoft};
    border-color: ${({ theme }) => theme.color.danger};
  }
`;
