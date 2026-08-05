import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchDailyList } from '../api/dailyList'
import { carryOverTodo } from '../api/todo'
import { addDays, formatTimeHM, isSameLocalDay, parseLocalDate, startOfToday, toDateOnlyString } from '../utils/datetime'
import ClockIcon from '../components/icons/ClockIcon'
import {
  Main,
  PageHeader,
  PageTitle,
  DateSearch,
  DateInput,
  ArrowButton,
  TodoList,
  TodoItem,
  TodoRow,
  TodoExpanded,
  TodoActions,
  TodoTitle,
  TodoMemo,
  TimeRange,
  Badge,
  CarryButton,
  EmptyText,
  StatusText,
} from './styles/Todo.styles'

// 지난 기록은 과거 날짜만 조회 가능 (오늘/내일은 각각 '오늘의 할 일', '밀린 할 일'에서 다룸)
const maxHistoryDate = () => addDays(startOfToday(), -1)

export default function TodoListsPage() {
  const [date, setDate] = useState(maxHistoryDate())
  const [dailyList, setDailyList] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [carriedIds, setCarriedIds] = useState([])
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const navigate = useNavigate()

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    fetchDailyList(toDateOnlyString(date))
      .then(setDailyList)
      .catch(() => {
        setDailyList(null)
        setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [date])

  const handleCarry = async (id) => {
    await carryOverTodo(id)
    setCarriedIds((prev) => [...prev, id])
  }

  return (
    <Main>
      <PageHeader>
        <PageTitle>지난 기록</PageTitle>
        {carriedIds.length > 0 && (
          <CarryButton onClick={() => navigate('/today')}>오늘의 할 일 보기</CarryButton>
        )}
      </PageHeader>

      <DateSearch>
        <ArrowButton type="button" onClick={() => setDate((d) => addDays(d, -1))} aria-label="이전 날짜">
          ‹
        </ArrowButton>
        <DatePicker
          selected={date}
          onChange={setDate}
          maxDate={maxHistoryDate()}
          locale="ko"
          dateFormat="yyyy.MM.dd (EEE)"
          customInput={<DateInput readOnly />}
        />
        <ArrowButton
          type="button"
          onClick={() => setDate((d) => addDays(d, 1))}
          disabled={isSameLocalDay(date, maxHistoryDate())}
          aria-label="다음 날짜"
        >
          ›
        </ArrowButton>
      </DateSearch>

      {loading && <StatusText>불러오는 중...</StatusText>}
      {notFound && <EmptyText>해당 날짜의 기록이 없습니다.</EmptyText>}

      {dailyList && (
        <TodoList>
          {dailyList.todos.map((todo) => (
            <TodoItem key={todo.id} $done={todo.done} onClick={() => toggleExpand(todo.id)}>
              <TodoRow>
                <TodoTitle $done={todo.done}>{todo.title}</TodoTitle>
                {todo.startTime && todo.endTime && (
                  <TimeRange>
                    <ClockIcon />
                    {formatTimeHM(parseLocalDate(todo.startTime))} ~ {formatTimeHM(parseLocalDate(todo.endTime))}
                  </TimeRange>
                )}
                {todo.carryOverDays > 1 && <Badge>{todo.carryOverDays}일째</Badge>}
              </TodoRow>

              {expandedIds.has(todo.id) && (
                <TodoExpanded onClick={(e) => e.stopPropagation()}>
                  {todo.memo && <TodoMemo>{todo.memo}</TodoMemo>}
                  {!todo.done && (
                    <TodoActions>
                      <CarryButton disabled={carriedIds.includes(todo.id)} onClick={() => handleCarry(todo.id)}>
                        {carriedIds.includes(todo.id) ? '오늘로 이월됨' : '오늘 하기'}
                      </CarryButton>
                    </TodoActions>
                  )}
                </TodoExpanded>
              )}
            </TodoItem>
          ))}
          {dailyList.todos.length === 0 && <EmptyText>등록된 할 일이 없습니다.</EmptyText>}
        </TodoList>
      )}
    </Main>
  )
}
