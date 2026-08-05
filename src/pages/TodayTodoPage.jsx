import { useEffect, useMemo, useState } from 'react'
import { fetchDailyList } from '../api/dailyList'
import { toggleDone, deleteTodo, postponeTodo } from '../api/todo'
import { formatTimeHM, parseLocalDate } from '../utils/datetime'
import ClockIcon from '../components/icons/ClockIcon'
import {
  Main,
  PageHeader,
  PageTitle,
  FilterRow,
  FilterButton,
  TodoList,
  TodoItem,
  TodoRow,
  TodoExpanded,
  TodoActions,
  Checkbox,
  TodoTitle,
  TodoMemo,
  TimeRange,
  Badge,
  EditLink,
  DeleteButton,
  CarryButton,
  EmptyText,
  GhostAddRow,
} from './styles/Todo.styles'

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '미완료만' },
  { key: 'done', label: '완료만' },
]

export default function TodayTodoPage() {
  const [dailyList, setDailyList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [now, setNow] = useState(() => new Date())
  const [expandedIds, setExpandedIds] = useState(() => new Set())

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const load = () => {
    setLoading(true)
    fetchDailyList().then((data) => {
      setDailyList(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    load()
  }, [])

  // 마감 지남 표시가 실시간으로 붉어지도록 주기적으로 재계산
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])

  const handleToggle = async (id) => {
    await toggleDone(id)
    load()
  }

  const handleDelete = async (id) => {
    await deleteTodo(id)
    load()
  }

  const handlePostpone = async (id) => {
    await postponeTodo(id)
    load()
  }

  const visibleTodos = useMemo(() => {
    const todos = dailyList?.todos ?? []
    const filtered = todos.filter((todo) => {
      if (filter === 'active') return !todo.done
      if (filter === 'done') return todo.done
      return true
    })

    return [...filtered].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1
      const aTime = a.endTime ? new Date(a.endTime).getTime() : Infinity
      const bTime = b.endTime ? new Date(b.endTime).getTime() : Infinity
      return aTime - bTime
    })
  }, [dailyList, filter])

  if (loading) return <Main>불러오는 중...</Main>

  return (
    <Main>
      <PageHeader>
        <PageTitle>오늘의 할 일 {dailyList && `(${dailyList.listDate})`}</PageTitle>
      </PageHeader>

      <FilterRow>
        {FILTERS.map((f) => (
          <FilterButton key={f.key} type="button" $active={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label}
          </FilterButton>
        ))}
      </FilterRow>

      <TodoList>
        {visibleTodos.map((todo) => {
          const start = todo.startTime ? parseLocalDate(todo.startTime) : null
          const end = todo.endTime ? parseLocalDate(todo.endTime) : null
          const overdue = !todo.done && end && end < now

          const expanded = expandedIds.has(todo.id)

          return (
            <TodoItem key={todo.id} $done={todo.done} onClick={() => toggleExpand(todo.id)}>
              <TodoRow>
                <Checkbox
                  checked={todo.done}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => handleToggle(todo.id)}
                />
                <TodoTitle $done={todo.done}>{todo.title}</TodoTitle>
                {start && end && (
                  <TimeRange $overdue={overdue}>
                    <ClockIcon />
                    {formatTimeHM(start)} ~ {formatTimeHM(end)}
                  </TimeRange>
                )}
                {todo.carryOverDays > 1 && <Badge>{todo.carryOverDays}일째</Badge>}
              </TodoRow>

              {expanded && (
                <TodoExpanded onClick={(e) => e.stopPropagation()}>
                  {todo.memo && <TodoMemo>{todo.memo}</TodoMemo>}
                  <TodoActions>
                    {!todo.done && (
                      <CarryButton onClick={() => handlePostpone(todo.id)}>내일로 미루기</CarryButton>
                    )}
                    <EditLink to={`/todos/${todo.id}/edit`} state={{ todo }}>수정</EditLink>
                    <DeleteButton onClick={() => handleDelete(todo.id)}>삭제</DeleteButton>
                  </TodoActions>
                </TodoExpanded>
              )}
            </TodoItem>
          )
        })}

        {visibleTodos.length === 0 && dailyList?.todos.length > 0 && (
          <EmptyText>조건에 맞는 할 일이 없습니다.</EmptyText>
        )}

        <GhostAddRow to="/todos/new">+ 새 할 일 추가</GhostAddRow>
      </TodoList>
    </Main>
  )
}
