import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createTodo, updateTodo } from "../api/todo";
import {
  combineDateTime,
  formatTimeHM,
  parseLocalDate,
  pad,
  roundToNearestTenMinutes,
  to12Hour,
  to24Hour,
} from "../utils/datetime";
import TimeWheelPicker from "../components/TimeWheelPicker/TimeWheelPicker";
import {
  Main,
  PageTitle,
  Form,
  FieldGroup,
  FieldRow,
  FieldLabel,
  InputBox,
  TextAreaBox,
  CharCount,
  FilterRow,
  FilterButton,
  HintText,
  ErrorText,
  FormActions,
  CancelButton,
  SaveButton,
} from "./styles/Todo.styles";

const TITLE_MAX = 200;
const MEMO_MAX = 1000;

const toHM = (isoString) => {
  const date = parseLocalDate(isoString);
  return date ? formatTimeHM(date) : formatTimeHM(roundToNearestTenMinutes(new Date()));
};

export default function TodoFormPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const editingTodo = state?.todo ?? null;
  // 달력에서 특정 날짜를 골라 들어온 경우에만 존재 (생성 전용, 수정 시엔 날짜를 옮기지 않음)
  const targetDate = !id && state?.targetDate ? state.targetDate : null;
  const targetDateObj = targetDate ? new Date(`${targetDate}T00:00:00`) : new Date();

  const [title, setTitle] = useState(editingTodo?.title ?? "");
  const [memo, setMemo] = useState(editingTodo?.memo ?? "");
  const [hasTime, setHasTime] = useState(
    editingTodo ? Boolean(editingTodo.startTime) : true,
  );
  const [startTime, setStartTime] = useState(toHM(editingTodo?.startTime));
  const [endTime, setEndTime] = useState(toHM(editingTodo?.endTime));
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // 시작 시간의 오전/오후를 바꾸면 종료 시간도 같은 오전/오후로 따라감 (시/분은 유지, 자정을 넘나드는 경우는 사용자가 직접 조정)
  const handleStartTimeChange = (nextStart) => {
    setStartTime(nextStart);
    const nextPeriod = to12Hour(Number(nextStart.split(":")[0])).period;

    setEndTime((prevEnd) => {
      const [prevHour24, prevMinute] = prevEnd.split(":").map(Number);
      const { hour12, period: prevPeriod } = to12Hour(prevHour24);
      if (prevPeriod === nextPeriod) return prevEnd;
      return `${pad(to24Hour(hour12, nextPeriod))}:${pad(prevMinute)}`;
    });
  };

  // 종료 시간이 시작 시간보다 빨라지면: 오전이었다면 오후로 바꿔서 자동 보정 시도, 그래도 빠르면 경고만 표시
  const handleEndTimeChange = (nextEnd) => {
    if (nextEnd >= startTime) {
      setEndTime(nextEnd);
      setError(null);
      return;
    }

    const [endHour24, endMinute] = nextEnd.split(":").map(Number);
    if (to12Hour(endHour24).period === "AM") {
      const flipped = `${pad(endHour24 + 12)}:${pad(endMinute)}`;
      if (flipped >= startTime) {
        setEndTime(flipped);
        setError(null);
        return;
      }
    }

    setEndTime(nextEnd);
    setError("종료 시간은 시작 시간보다 빠를 수 없습니다.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (hasTime && endTime < startTime) {
      setError("종료 시간은 시작 시간보다 빠를 수는 없습니다.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const payload = {
      title: title.trim(),
      memo: memo.trim() || null,
      startTime: hasTime ? combineDateTime(targetDateObj, startTime) : null,
      endTime: hasTime ? combineDateTime(targetDateObj, endTime) : null,
      ...(targetDate ? { targetDate } : {}),
    };
    try {
      if (id) {
        await updateTodo(id, payload);
      } else {
        await createTodo(payload);
      }
      if (targetDate) {
        navigate("/todos", { state: { selectedDate: targetDate } });
      } else {
        navigate("/today");
      }
    } catch (err) {
      setError(err.response?.data?.message || "저장 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Main>
      <PageTitle>
        {id
          ? "할 일 수정"
          : targetDate
            ? `새 할 일 · ${targetDateObj.getMonth() + 1}월 ${targetDateObj.getDate()}일`
            : "새 할 일"}
      </PageTitle>
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldLabel>제목</FieldLabel>
          <InputBox
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, TITLE_MAX))}
            placeholder="할 일을 입력하세요"
            maxLength={TITLE_MAX}
          />
          <CharCount $over={title.length >= TITLE_MAX}>
            {title.length}/{TITLE_MAX}
          </CharCount>
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>메모</FieldLabel>
          <TextAreaBox
            value={memo}
            onChange={(e) => setMemo(e.target.value.slice(0, MEMO_MAX))}
            placeholder="메모 (선택)"
            maxLength={MEMO_MAX}
          />
          <CharCount $over={memo.length >= MEMO_MAX}>
            {memo.length}/{MEMO_MAX}
          </CharCount>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>시간</FieldLabel>
          <FilterRow>
            <FilterButton
              type="button"
              $active={hasTime}
              onClick={() => setHasTime(true)}
            >
              시간 지정
            </FilterButton>
            <FilterButton
              type="button"
              $active={!hasTime}
              onClick={() => setHasTime(false)}
            >
              시간 없이
            </FilterButton>
          </FilterRow>
        </FieldGroup>

        {hasTime ? (
          <FieldRow>
            <FieldGroup>
              <FieldLabel>시작 시간</FieldLabel>
              <TimeWheelPicker
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>종료 시간</FieldLabel>
              <TimeWheelPicker
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </FieldGroup>
          </FieldRow>
        ) : (
          <HintText>{targetDate ? "그 날 안에만 하면 되는 일" : "오늘 안에만 하면 되는 일"}</HintText>
        )}

        {error && <ErrorText>{error}</ErrorText>}

        <FormActions>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <SaveButton type="submit" disabled={submitting}>
            저장
          </SaveButton>
        </FormActions>
      </Form>
    </Main>
  );
}
