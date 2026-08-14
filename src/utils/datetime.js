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

// 기준 날짜 + "HH:mm" 문자열을 합쳐 LocalDateTime 문자열로
export const combineDateTime = (date, hhmm) => {
  if (!hhmm) return null;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${hhmm}:00`;
};

// 오늘 날짜 + "HH:mm" (할 일 생성 시 대상 날짜를 지정하지 않은 경우)
export const combineTodayTime = (hhmm) => combineDateTime(new Date(), hhmm);

export const parseLocalDate = (isoString) => (isoString ? new Date(isoString) : null);

export const formatTimeHM = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

// 시간 휠 피커가 10분 단위만 표시하므로, 새 할 일의 기본값도 미리 10분 단위로 스냅해서 넘겨야
// 휠에는 스냅된 시각이 보이는데 실제 저장 값은 스냅 전 "지금" 시각(예: 10:33)으로 남는 걸 방지
export const roundToNearestTenMinutes = (date) => {
  const rounded = new Date(date);
  rounded.setMinutes(Math.round(date.getMinutes() / 10) * 10, 0, 0);
  return rounded;
};

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

export const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
