import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchDailyList, fetchMonthSummary } from '../api/dailyList'
import { carryOverTodo } from '../api/todo'
import { addDays, endOfMonth, formatTimeHM, parseLocalDate, startOfMonth, startOfToday, toDateOnlyString } from '../utils/datetime'
import ClockIcon from '../components/icons/ClockIcon'
import {
  Main,
  PageHeader,
  PageTitle,
  DateSearch,
  TodoList,
  TodoItem,
  TodoRow,
  TodoExpanded,
  TodoActions,
  TodoTitle,
  TodoMemo,
  TimeRange,
  Badge,
  PostponedBadge,
  CarryButton,
  GhostAddRow,
  EmptyText,
  StatusText,
} from './styles/Todo.styles'

const parseDateOnly = (dateString) => new Date(`${dateString}T00:00:00`)

export default function TodoListsPage() {
  const { state } = useLocation()
  const [date, setDate] = useState(() => (state?.selectedDate ? parseDateOnly(state.selectedDate) : new Date()))
  const [visibleMonth, setVisibleMonth] = useState(date)
  const [summaryMap, setSummaryMap] = useState({})
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

  useEffect(() => {
    const start = addDays(startOfMonth(visibleMonth), -7)
    const end = addDays(endOfMonth(visibleMonth), 7)
    fetchMonthSummary(toDateOnlyString(start), toDateOnlyString(end))
      .then((summaries) => {
        const map = {}
        summaries.forEach((s) => {
          map[s.date] = s
        })
        setSummaryMap(map)
      })
      .catch(() => setSummaryMap({}))
  }, [visibleMonth])

  const handleCarry = async (id) => {
    await carryOverTodo(id)
    setCarriedIds((prev) => [...prev, id])
  }

  const isPastDate = date < startOfToday()

  const dayClassName = (d) => {
    const summary = summaryMap[toDateOnlyString(d)]
    if (!summary || summary.total === 0) return undefined
    return summary.done >= summary.total ? 'day-all-done' : 'day-has-pending'
  }

  return (
    <Main>
      <PageHeader>
        <PageTitle>달력</PageTitle>
        {carriedIds.length > 0 && (
          <CarryButton onClick={() => navigate('/today')}>오늘의 할 일 보기</CarryButton>
        )}
      </PageHeader>

      <DateSearch>
        <DatePicker
          inline
          selected={date}
          onChange={setDate}
          onMonthChange={setVisibleMonth}
          locale="ko"
          dayClassName={dayClassName}
        />
      </DateSearch>

      {loading && <StatusText>불러오는 중...</StatusText>}

      {!loading && (
        <>
          {!isPastDate && (
            <GhostAddRow to="/todos/new" state={{ targetDate: toDateOnlyString(date) }}>
              + 이 날짜에 할 일 추가
            </GhostAddRow>
          )}

          {notFound && <EmptyText>등록된 할 일이 없습니다.</EmptyText>}

          {dailyList && (
            <TodoList>
              {dailyList.todos.map((todo) => (
                <TodoItem key={todo.id} $done={todo.effectiveDone} onClick={() => toggleExpand(todo.id)}>
                  <TodoRow>
                    <TodoTitle $done={todo.effectiveDone}>{todo.title}</TodoTitle>
                    {todo.startTime && todo.endTime && (
                      <TimeRange>
                        <ClockIcon />
                        {formatTimeHM(parseLocalDate(todo.startTime))} ~ {formatTimeHM(parseLocalDate(todo.endTime))}
                      </TimeRange>
                    )}
                    {!todo.done && todo.effectiveDone && (
                      <PostponedBadge>다른 날짜에 완료</PostponedBadge>
                    )}
                    {todo.carryOverDays > 1 && <Badge>{todo.carryOverDays}일째</Badge>}
                  </TodoRow>

                  {expandedIds.has(todo.id) && (
                    <TodoExpanded onClick={(e) => e.stopPropagation()}>
                      {todo.memo && <TodoMemo>{todo.memo}</TodoMemo>}
                      {!todo.done && !todo.postponedTodoId && !todo.carriedTodoId && (
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
        </>
      )}
    </Main>
  )
}
