import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useThemeMode } from "../../../context/ThemeModeContext";
import { fetchTodoStats } from "../../../api/todo";
import {
  Overlay,
  Panel,
  PanelHeader,
  PanelLogo,
  CloseButton,
  StatsSection,
  StatCard,
  StatValue,
  StatLabel,
  NavList,
  NavItem,
  Divider,
  ThemeSection,
  SectionTitle,
  ModeRow,
  ModeLabel,
  ModeToggle,
  ModeToggleKnob,
  ThemeDots,
  ThemeDot,
  Bottom,
  LogoutButton,
} from "./Sidebar.styles";

const navs = [
  { content: "오늘의 할 일", to: "/today" },
  { content: "달력", to: "/todos" },
  { content: "밀린 할 일", to: "/todos/backlog" },
  { content: "마이페이지", to: "/mypage" },
];

const Sidebar = ({ open, onClose }) => {
  const navi = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { themeKey, setThemeKey, palettes, mode, toggleMode } = useThemeMode();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!open || !user) return;
    fetchTodoStats()
      .then(setStats)
      .catch(() => setStats(null));
  }, [open, user]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const go = (to) => navi(to);

  const handleLogout = async () => {
    await logout();
    navi("/login");
  };

  if (!user) return null;

  return (
    <>
      <Overlay $open={open} onClick={onClose} aria-hidden={!open} />
      <Panel $open={open} aria-hidden={!open}>
        <PanelHeader>
          <PanelLogo>O2DO</PanelLogo>
          <CloseButton type="button" onClick={onClose} aria-label="메뉴 닫기">
            ✕
          </CloseButton>
        </PanelHeader>

        <StatsSection>
          <StatCard>
            <StatValue>{stats?.completedCount ?? "-"}</StatValue>
            <StatLabel>완료한 할 일</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats?.carryingOverCount ?? "-"}</StatValue>
            <StatLabel>오늘 이월 중</StatLabel>
          </StatCard>
        </StatsSection>

        <NavList>
          {navs.map((n) => (
            <NavItem key={n.to} type="button" onClick={() => go(n.to)}>
              {n.content}
            </NavItem>
          ))}
        </NavList>

        <Divider />

        <ThemeSection>
          <SectionTitle>화면 모드</SectionTitle>
          <ModeRow>
            <ModeLabel>{mode === "dark" ? "다크 모드" : "라이트 모드"}</ModeLabel>
            <ModeToggle
              type="button"
              role="switch"
              aria-checked={mode === "dark"}
              aria-label="다크 모드 전환"
              $active={mode === "dark"}
              onClick={toggleMode}
            >
              <ModeToggleKnob $active={mode === "dark"} />
            </ModeToggle>
          </ModeRow>
        </ThemeSection>

        <ThemeSection>
          <SectionTitle>포인트 컬러</SectionTitle>
          <ThemeDots>
            {Object.entries(palettes).map(([key, palette]) => (
              <ThemeDot
                key={key}
                type="button"
                title={palette.label}
                aria-label={palette.label}
                $color={palette.point}
                $active={key === themeKey}
                onClick={() => setThemeKey(key)}
              />
            ))}
          </ThemeDots>
        </ThemeSection>

        <Bottom>
          <LogoutButton type="button" onClick={handleLogout}>
            로그아웃
          </LogoutButton>
        </Bottom>
      </Panel>
    </>
  );
};

export default Sidebar;
