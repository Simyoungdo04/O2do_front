import client from './client'

export const createTodo = (data) =>
  client.post('/api/todos', data).then((res) => res.data.data)

export const updateTodo = (id, data) =>
  client.put(`/api/todos/${id}`, data).then((res) => res.data.data)

export const toggleDone = (id) =>
  client.patch(`/api/todos/${id}/done`).then((res) => res.data.data)

export const carryOverTodo = (id) =>
  client.post(`/api/todos/${id}/carry`).then((res) => res.data.data)

export const postponeTodo = (id) =>
  client.post(`/api/todos/${id}/postpone`).then((res) => res.data.data)

export const cancelPostponeTodo = (id) =>
  client.delete(`/api/todos/${id}/postpone`).then((res) => res.data.data)

export const deleteTodo = (id) =>
  client.delete(`/api/todos/${id}`).then((res) => res.data.data)

export const fetchTodoStats = () =>
  client.get('/api/todos/stats').then((res) => res.data.data)

export const fetchIncompleteHistory = () =>
  client.get('/api/todos/incomplete-history').then((res) => res.data.data)
