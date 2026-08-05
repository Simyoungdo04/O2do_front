import { AuthWrapper, AuthCard, AuthTitle, AuthSubTitle, KakaoButton } from './styles/Auth.styles'

const KAKAO_AUTH_URL =
  `https://kauth.kakao.com/oauth/authorize` +
  `?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI)}` +
  `&response_type=code`

export default function LoginPage() {
  return (
    <AuthWrapper>
      <AuthCard>
        <AuthTitle>O2do</AuthTitle>
        <AuthSubTitle>오늘 못 끝낸 일은, 내가 다시 선택한다.</AuthSubTitle>
        <KakaoButton onClick={() => (window.location.href = KAKAO_AUTH_URL)}>
          카카오로 시작하기
        </KakaoButton>
      </AuthCard>
    </AuthWrapper>
  )
}
