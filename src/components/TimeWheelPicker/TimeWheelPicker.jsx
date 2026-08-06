import { WheelPicker, WheelPickerWrapper } from "@ncdai/react-wheel-picker";
import "@ncdai/react-wheel-picker/style.css";
import { WheelFrame, Separator, PeriodColumn, PeriodOption } from "./TimeWheelPicker.styles";
import { pad, to12Hour as to12, to24Hour as to24 } from "../../utils/datetime";

const PERIODS = [
  { value: "AM", label: "오전" },
  { value: "PM", label: "오후" },
];

const HOURS_12 = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: String(i + 1) }));
const MINUTES = Array.from({ length: 6 }, (_, i) => ({ value: i * 10, label: pad(i * 10) }));

// value/onChange은 "HH:mm"(24시간) 문자열로 주고받음 - 내부에서만 12시간+오전/오후로 변환
// 하루 중 어떤 시간이든(과거 포함) 자유롭게 선택 가능 - 이미 지난 일도 기록할 수 있어야 하므로 제한 없음
export default function TimeWheelPicker({ value, onChange }) {
  const now = new Date();
  const [hour24, minute] = value
    ? value.split(":").map(Number)
    : [now.getHours(), now.getMinutes()];

  const { hour12, period } = to12(hour24);

  // 10분 단위 도입 전 데이터(예: 14:23)를 열어도 휠이 깨지지 않도록 가장 가까운 단위로 스냅해서 표시
  const displayMinute = MINUTES.reduce(
    (closest, opt) => (Math.abs(opt.value - minute) < Math.abs(closest - minute) ? opt.value : closest),
    MINUTES[0].value,
  );

  const emit = (nextHour12, nextPeriod, nextMinute) => {
    onChange(`${pad(to24(nextHour12, nextPeriod))}:${pad(nextMinute)}`);
  };

  return (
    <WheelFrame>
      <PeriodColumn>
        {PERIODS.map((opt) => {
          const active = period === opt.value
          const position = active ? "center" : opt.value === "AM" ? "above" : "below"
          return (
            <PeriodOption
              key={opt.value}
              type="button"
              $active={active}
              $position={position}
              onClick={() => emit(hour12, opt.value, displayMinute)}
            >
              {opt.label}
            </PeriodOption>
          )
        })}
      </PeriodColumn>

      <WheelPickerWrapper>
        <WheelPicker
          options={HOURS_12}
          value={hour12}
          onValueChange={(nextHour12) => emit(nextHour12, period, displayMinute)}
          infinite
          optionItemHeight={36}
          visibleCount={12}
        />
        <Separator>:</Separator>
        <WheelPicker
          options={MINUTES}
          value={displayMinute}
          onValueChange={(nextMinute) => emit(hour12, period, nextMinute)}
          infinite
          optionItemHeight={36}
          visibleCount={12}
        />
      </WheelPickerWrapper>
    </WheelFrame>
  );
}
