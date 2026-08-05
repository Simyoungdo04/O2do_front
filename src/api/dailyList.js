import client from './client'

export const fetchDailyList = (date) =>
  client.get('/api/dailylist', { params: date ? { date } : {} }).then((res) => res.data.data)
