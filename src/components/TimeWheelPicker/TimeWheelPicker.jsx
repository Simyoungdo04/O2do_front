import { WheelPicker, WheelPickerWrapper } from "@ncdai/react-wheel-picker";
import "@ncdai/react-wheel-picker/style.css";
import { WheelFrame, Separator, PeriodColumn, PeriodOption } from "./TimeWheelPicker.styles";
import { pad, to12Hour as to12, to24Hour as to24 } from "../../utils/datetime";

const PERIODS = [
  { value: "AM", label: "오전" },
  { value: "PM", label: "오후" },
];

const HOURS_12 = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: String(i + 1) }));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({ value: i, label: pad(i) }));

// value/onChange은 "HH:mm"(24시간) 문자열로 주고받음 - 내부에서만 12시간+오전/오후로 변환
export default function TimeWheelPicker({ value, onChange, disablePast = false }) {
  const now = new Date();
  const [hour24, minute] = value
    ? value.split(":").map(Number)
    : [now.getHours(), now.getMinutes()];

  const { hour12, period } = to12(hour24);
  const nowPeriod = to12(now.getHours()).period;

  const emit = (nextHour12, nextPeriod, nextMinute) => {
    onChange(`${pad(to24(nextHour12, nextPeriod))}:${pad(nextMinute)}`);
  };

  const isCurrentPeriod = disablePast && period === nowPeriod;

  const hourOptions = isCurrentPeriod
    ? HOURS_12.map((opt) => ({ ...opt, disabled: to24(opt.value, period) < now.getHours() }))
    : HOURS_12;

  const isCurrentHour = isCurrentPeriod && to24(hour12, period) === now.getHours();

  const minuteOptions = isCurrentHour
    ? MINUTES.map((opt) => ({ ...opt, disabled: opt.value < now.getMinutes() }))
    : MINUTES;

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
              disabled={disablePast && opt.value === "AM" && nowPeriod === "PM"}
              onClick={() => emit(hour12, opt.value, minute)}
            >
              {opt.label}
            </PeriodOption>
          )
        })}
      </PeriodColumn>

      <WheelPickerWrapper>
        <WheelPicker
          options={hourOptions}
          value={hour12}
          onValueChange={(nextHour12) => emit(nextHour12, period, minute)}
          infinite
          optionItemHeight={36}
          visibleCount={12}
        />
        <Separator>:</Separator>
        <WheelPicker
          options={minuteOptions}
          value={minute}
          onValueChange={(nextMinute) => emit(hour12, period, nextMinute)}
          infinite
          optionItemHeight={36}
          visibleCount={12}
        />
      </WheelPickerWrapper>
    </WheelFrame>
  );
}
