import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  AuthWrapper,
  AuthCard,
  AuthLogo,
  AuthSubTitle,
  KakaoButton,
} from "./styles/Auth.styles";

const KAKAO_AUTH_URL =
  `https://kauth.kakao.com/oauth/authorize` +
  `?client_id=21415eadcb39d8c5abd455ed382b4ba8` +
  `&redirect_uri=${encodeURIComponent("https://mungchi.xyz/oauth/callback")}` +
  `&response_type=code`;

export default function LoginPage() {
  const { isLogin } = useAuth();

  if (isLogin) {
    return <Navigate to="/today" replace />;
  }

  return (
    <AuthWrapper>
      <AuthCard>
        <AuthLogo>
          <span className="dot" />
          O2DO
        </AuthLogo>
        <AuthSubTitle>오늘의 TODO</AuthSubTitle>
        <KakaoButton onClick={() => (window.location.href = KAKAO_AUTH_URL)}>
          카카오로 시작하기
        </KakaoButton>
      </AuthCard>
    </AuthWrapper>
  );
}
