import client from './client'

export const kakaoLogin = (code) =>
  client.post('/api/user/login/kakao', null, { params: { code } }).then((res) => res.data.data)

export const googleLogin = (code) =>
  client.post('/api/user/login/google', null, { params: { code } }).then((res) => res.data.data)

export const fetchMyPage = () =>
  client.get('/api/user/mypage').then((res) => res.data.data)

export const logout = (refreshToken) =>
  client.post('/api/token/logout', null, { params: { refreshToken } }).then((res) => res.data.data)

export const withdraw = () =>
  client.delete('/api/user').then((res) => res.data.data)
