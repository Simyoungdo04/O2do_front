import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { localLogin, signup } from "../api/auth";
import kakaoLoginImg from "../assets/kakao/kakao_login_large_wide.png";
import googleIcon from "../assets/google/google_icon_light.svg";
import {
  AuthWrapper,
  AuthCard,
  AuthLogo,
  AuthSubTitle,
  AuthForm,
  AuthFieldGroup,
  AuthInput,
  AuthSubmitButton,
  AuthDivider,
  AuthToggleText,
  AuthFieldError,
  AuthHint,
  ErrorText,
  KakaoButton,
  GoogleButton,
} from "./styles/Auth.styles";

const KAKAO_AUTH_URL =
  `https://kauth.kakao.com/oauth/authorize` +
  `?client_id=21415eadcb39d8c5abd455ed382b4ba8` +
  `&redirect_uri=${encodeURIComponent("https://mungchi.xyz/oauth/callback")}` +
  `&response_type=code` +
  `&prompt=login`;

const GOOGLE_AUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?client_id=612124533253-lfvce2cbjuljdc9ngm3ifv6s42c4lbul.apps.googleusercontent.com` +
  `&redirect_uri=${encodeURIComponent("https://mungchi.xyz/oauth/callback/google")}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent("openid email profile")}` +
  `&prompt=select_account consent`;

const initialForm = { loginId: "", password: "", passwordConfirm: "", userName: "" };

export default function LoginPage() {
  const { isLogin, login } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isLogin) {
    return <Navigate to="/today" replace />;
  }

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setForm(initialForm);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "loginId" ? value.replace(/[^a-zA-Z0-9]/g, "") : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const passwordMismatch =
    mode === "signup" && form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (passwordMismatch) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setSubmitting(true);
    try {
      const response =
        mode === "login"
          ? await localLogin({ loginId: form.loginId, password: form.password })
          : await signup({
              loginId: form.loginId,
              password: form.password,
              userName: form.userName,
            });

      login(response);
      navigate("/today");
    } catch (err) {
      setError(err.response?.data?.message || "요청 처리 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <AuthCard>
        <AuthLogo>
          <span className="dot" />
          O2DO
        </AuthLogo>
        <AuthSubTitle>오늘의 TODO</AuthSubTitle>

        {error && <ErrorText>{error}</ErrorText>}

        <AuthForm onSubmit={handleSubmit}>
          <AuthFieldGroup>
            <AuthInput
              name="loginId"
              placeholder="아이디"
              value={form.loginId}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            {mode === "signup" && <AuthHint>아이디 · 영문/숫자 4~20자</AuthHint>}
          </AuthFieldGroup>

          <AuthFieldGroup>
            <AuthInput
              type="password"
              name="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />
            {mode === "signup" && <AuthHint>비밀번호 · 8~64자</AuthHint>}
          </AuthFieldGroup>

          {mode === "signup" && (
            <>
              <AuthFieldGroup>
                <AuthInput
                  type="password"
                  name="passwordConfirm"
                  placeholder="비밀번호 확인"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                {passwordMismatch && (
                  <AuthFieldError>비밀번호가 일치하지 않습니다.</AuthFieldError>
                )}
              </AuthFieldGroup>

              <AuthFieldGroup>
                <AuthInput
                  name="userName"
                  placeholder="닉네임"
                  value={form.userName}
                  onChange={handleChange}
                  required
                />
                <AuthHint>닉네임 · 최대 50자</AuthHint>
              </AuthFieldGroup>
            </>
          )}
          <AuthSubmitButton type="submit" disabled={submitting || passwordMismatch}>
            {mode === "login" ? "로그인" : "회원가입"}
          </AuthSubmitButton>
        </AuthForm>

        <AuthToggleText>
          {mode === "login" ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
          <button type="button" onClick={toggleMode}>
            {mode === "login" ? "회원가입" : "로그인"}
          </button>
        </AuthToggleText>

        <AuthDivider>또는</AuthDivider>

        <KakaoButton onClick={() => (window.location.href = KAKAO_AUTH_URL)}>
          <img src={kakaoLoginImg} alt="카카오 로그인" />
        </KakaoButton>
        <GoogleButton onClick={() => (window.location.href = GOOGLE_AUTH_URL)}>
          <img src={googleIcon} alt="" aria-hidden="true" />
          Google 로그인
        </GoogleButton>
      </AuthCard>
    </AuthWrapper>
  );
}
