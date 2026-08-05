import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { carryOverTodo, cancelPostponeTodo, fetchIncompleteHistory } from '../api/todo'
import { formatTimeHM, parseLocalDate } from '../utils/datetime'
import ClockIcon from '../components/icons/ClockIcon'
import {
  Main,
  PageHeader,
  PageTitle,
  BacklogGroup,
  DividerLabel,
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
  IconButton,
  EmptyText,
  StatusText,
} from './styles/Todo.styles'

export default function BacklogPage() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [removedIds, setRemovedIds] = useState([])
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
    fetchIncompleteHistory()
      .then(setGroups)
      .catch(() => setGroups([]))
      .finally(() => setLoading(false))
  }, [])

  const handleCarry = async (id) => {
    await carryOverTodo(id)
    setRemovedIds((prev) => [...prev, id])
  }

  const handleCancelPostpone = async (id) => {
    await cancelPostponeTodo(id)
    setRemovedIds((prev) => [...prev, id])
  }

  const visibleGroups = groups
    .map((group) => ({ ...group, todos: group.todos.filter((todo) => !removedIds.includes(todo.id)) }))
    .filter((group) => group.todos.length > 0)

  return (
    <Main>
      <PageHeader>
        <PageTitle>밀린 할 일</PageTitle>
        {removedIds.length > 0 && (
          <CarryButton onClick={() => navigate('/today')}>오늘의 할 일 보기</CarryButton>
        )}
      </PageHeader>

      {loading && <StatusText>불러오는 중...</StatusText>}

      {!loading && visibleGroups.length === 0 && (
        <EmptyText>밀린 할 일이 없습니다.</EmptyText>
      )}

      {visibleGroups.map((group) => (
        <BacklogGroup key={group.id}>
          <DividerLabel>{group.listDate}</DividerLabel>
          <TodoList>
            {group.todos.map((todo) => (
              <TodoItem key={todo.id} onClick={() => toggleExpand(todo.id)}>
                <TodoRow>
                  <TodoTitle>{todo.title}</TodoTitle>
                  {todo.startTime && todo.endTime && (
                    <TimeRange>
                      <ClockIcon />
                      {formatTimeHM(parseLocalDate(todo.startTime))} ~ {formatTimeHM(parseLocalDate(todo.endTime))}
                    </TimeRange>
                  )}
                  {todo.postponedTodoId && <PostponedBadge>내일로 미룸</PostponedBadge>}
                  {todo.carryOverDays > 1 && <Badge>{todo.carryOverDays}일째</Badge>}
                </TodoRow>

                {expandedIds.has(todo.id) && (
                  <TodoExpanded onClick={(e) => e.stopPropagation()}>
                    {todo.memo && <TodoMemo>{todo.memo}</TodoMemo>}
                    <TodoActions>
                      {todo.postponedTodoId ? (
                        <IconButton onClick={() => handleCancelPostpone(todo.id)}>미루기 취소</IconButton>
                      ) : (
                        <CarryButton onClick={() => handleCarry(todo.id)}>오늘 하기</CarryButton>
                      )}
                    </TodoActions>
                  </TodoExpanded>
                )}
              </TodoItem>
            ))}
          </TodoList>
        </BacklogGroup>
      ))}
    </Main>
  )
}
