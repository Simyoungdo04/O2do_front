import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createTodo, updateTodo } from "../api/todo";
import {
  combineTodayTime,
  formatTimeHM,
  parseLocalDate,
  pad,
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
  FilterRow,
  FilterButton,
  HintText,
  ErrorText,
  FormActions,
  CancelButton,
  SaveButton,
} from "./styles/Todo.styles";

const toHM = (isoString) => {
  const date = parseLocalDate(isoString);
  return date ? formatTimeHM(date) : formatTimeHM(new Date());
};

export default function TodoFormPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const editingTodo = state?.todo ?? null;

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
      memo: memo || null,
      startTime: hasTime ? combineTodayTime(startTime) : null,
      endTime: hasTime ? combineTodayTime(endTime) : null,
    };
    try {
      if (id) {
        await updateTodo(id, payload);
      } else {
        await createTodo(payload);
      }
      navigate("/today");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Main>
      <PageTitle>{id ? "할 일 수정" : "새 할 일"}</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldLabel>제목</FieldLabel>
          <InputBox
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>메모</FieldLabel>
          <TextAreaBox
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모 (선택)"
          />
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
                disablePast={!id}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>종료 시간</FieldLabel>
              <TimeWheelPicker
                value={endTime}
                onChange={setEndTime}
                disablePast={!id}
              />
            </FieldGroup>
          </FieldRow>
        ) : (
          <HintText>오늘 안에만 하면 되는 일</HintText>
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
