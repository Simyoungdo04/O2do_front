export const pad = (n) => String(n).padStart(2, "0");

export const to12Hour = (hour24) => ({
  period: hour24 < 12 ? "AM" : "PM",
  hour12: hour24 % 12 === 0 ? 12 : hour24 % 12,
});

export const to24Hour = (hour12, period) => {
  const base = hour12 % 12; // 12시는 0으로
  return period === "PM" ? base + 12 : base;
};

// LocalDateTime과 왕복 호환되는 오프셋 없는 로컬시각 문자열 (타임존 밀림 방지)
export const toLocalIsoString = (date) => {
  if (!date) return null;
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:00`
  );
};

// 오늘 날짜 + "HH:mm" 문자열을 합쳐 LocalDateTime 문자열로 (할 일은 항상 오늘 리스트 소속)
export const combineTodayTime = (hhmm) => {
  if (!hhmm) return null;
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${hhmm}:00`;
};

export const parseLocalDate = (isoString) => (isoString ? new Date(isoString) : null);

export const formatTimeHM = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

export const toDateOnlyString = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const isSameLocalDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};
