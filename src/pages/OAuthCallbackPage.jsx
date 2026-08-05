import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { kakaoLogin } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { AuthWrapper, AuthCard, AuthTitle, StatusText, ErrorText, BackButton } from './styles/Auth.styles'

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()
  const requested = useRef(false)

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      setError('인가 코드가 없습니다.')
      return
    }
    if (requested.current) return
    requested.current = true

    kakaoLogin(code)
      .then((response) => {
        login(response)
        navigate('/today', { replace: true })
      })
      .catch(() => {
        setError('카카오 로그인에 실패했습니다.')
      })
  }, [searchParams, login, navigate])

  if (error) {
    return (
      <AuthWrapper>
        <AuthCard>
          <AuthTitle>로그인 실패</AuthTitle>
          <ErrorText>{error}</ErrorText>
          <BackButton onClick={() => navigate('/login', { replace: true })}>다시 로그인</BackButton>
        </AuthCard>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper>
      <AuthCard>
        <AuthTitle>O2do</AuthTitle>
        <StatusText>로그인 처리 중...</StatusText>
      </AuthCard>
    </AuthWrapper>
  )
}
