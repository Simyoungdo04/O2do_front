import axios from 'axios'

const client = axios.create({
  baseURL: "https://mungchi.xyz",
})

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

let refreshPromise = null

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    if (!response || response.status !== 401 || config._retried) {
      return Promise.reject(error)
    }

    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      return Promise.reject(error)
    }

    config._retried = true

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`https://mungchi.xyz/api/token/refresh`, null, {
            params: { refreshToken },
          })
          .finally(() => {
            refreshPromise = null
          })
      }

      const { data } = await refreshPromise
      const { accessToken, refreshToken: newRefreshToken } = data.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)

      config.headers.Authorization = `Bearer ${accessToken}`
      return client(config)
    } catch (refreshError) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
      return Promise.reject(refreshError)
    }
  }
)

export default client
