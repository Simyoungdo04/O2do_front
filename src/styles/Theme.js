import { pointPalettes, DEFAULT_POINT_THEME } from "./themes";

const baseColor = {
  // --- 배경 ---
  bg: "#F8F9FA",
  bgSoft: "#F1F5F9",
  bgDark: "#E2E8F0",

  // --- 카드/패널 등 떠있는 표면 ---
  surface: "#FFFFFF",

  // --- 헤더 ---
  headerBg: "#FFFFFF",
  headerText: "#18181B",

  // --- 푸터 ---
  footerBg: "#F1F5F9",
  footerText: "#64748B",

  // --- input ---
  inputBg: "#F8FAFC",
  inputBorder: "#CBD5E1",
  placeholder: "#94A3B8",

  // --- 글자 ---
  text: "#18181B",
  sub: "#64748B",
  disabled: "#CBD5E1",

  // --- 테두리 ---
  border: "#E2E8F0",

  // --- 경고색 (포인트 컬러와 무관하게 고정) ---
  danger: "#DC2626",
  success: "#16A34A",
  dangerSoft: "#FEE2E2",
  successSoft: "#DCFCE7",
};

const darkColor = {
  // --- 배경 ---
  bg: "#121317",
  bgSoft: "#1B1D23",
  bgDark: "#26282F",

  // --- 카드/패널 등 떠있는 표면 ---
  surface: "#1B1D23",

  // --- 헤더 ---
  headerBg: "#1B1D23",
  headerText: "#F1F5F9",

  // --- 푸터 ---
  footerBg: "#1B1D23",
  footerText: "#94A3B8",

  // --- input ---
  inputBg: "#22242B",
  inputBorder: "#33363F",
  placeholder: "#6B7280",

  // --- 글자 ---
  text: "#F1F5F9",
  sub: "#94A3B8",
  disabled: "#4B5563",

  // --- 테두리 ---
  border: "#2C2F38",

  // --- 경고색 (포인트 컬러와 무관하게 고정) ---
  danger: "#F87171",
  success: "#4ADE80",
  dangerSoft: "#3A1E22",
  successSoft: "#173324",
};

const shadowByMode = {
  light: {
    sm: "0 1px 3px rgba(0,0,0,0.08)",
    md: "0 4px 12px rgba(0,0,0,0.10)",
  },
  dark: {
    sm: "0 1px 3px rgba(0,0,0,0.35)",
    md: "0 4px 16px rgba(0,0,0,0.45)",
  },
};

const shared = {
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },

  font: `'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Roboto, sans-serif`,
};

export const buildTheme = (paletteKey, mode = "light") => {
  const palette = pointPalettes[paletteKey] ?? pointPalettes[DEFAULT_POINT_THEME];
  const isDark = mode === "dark";

  return {
    ...shared,
    mode,
    shadow: shadowByMode[isDark ? "dark" : "light"],
    color: {
      ...(isDark ? darkColor : baseColor),
      point: palette.point,
      pointHover: palette.pointHover,
      pointDark: palette.pointDark,
      // 다크 모드에서는 연한 파스텔 대신 포인트 컬러를 낮은 불투명도로
      pointSoft: isDark ? `${palette.point}33` : palette.pointSoft,
    },
  };
};

// 정적 참조가 필요한 곳(styled-components 밖)을 위한 기본 테마
export const Theme = buildTheme(DEFAULT_POINT_THEME);
