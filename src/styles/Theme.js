import { pointPalettes, DEFAULT_POINT_THEME } from "./themes";

const baseColor = {
  // --- 배경 ---
  bg: "#F8F9FA",
  bgSoft: "#F1F5F9",
  bgDark: "#E2E8F0",

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

const shared = {
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },

  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.08)",
    md: "0 4px 12px rgba(0,0,0,0.10)",
  },

  font: `'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Roboto, sans-serif`,
};

export const buildTheme = (paletteKey) => {
  const palette = pointPalettes[paletteKey] ?? pointPalettes[DEFAULT_POINT_THEME];
  return {
    ...shared,
    color: {
      ...baseColor,
      point: palette.point,
      pointHover: palette.pointHover,
      pointDark: palette.pointDark,
      pointSoft: palette.pointSoft,
    },
  };
};

// 정적 참조가 필요한 곳(styled-components 밖)을 위한 기본 테마
export const Theme = buildTheme(DEFAULT_POINT_THEME);
