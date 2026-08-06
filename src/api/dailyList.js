import client from './client'

export const fetchDailyList = (date) =>
  client.get('/api/dailylist', { params: date ? { date } : {} }).then((res) => res.data.data)

export const fetchMonthSummary = (start, end) =>
  client.get('/api/dailylist/summary', { params: { start, end } }).then((res) => res.data.data)
