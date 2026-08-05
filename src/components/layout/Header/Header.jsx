import { useNavigate } from "react-router-dom";
import { HeaderWrap, Logo, Spacer, HamburgerButton, Bar, LoginBtn } from "./Header.styles";
import { useAuth } from "../../../context/AuthContext";

const Header = ({ onMenuClick }) => {
  const navi = useNavigate();
  const { isLogin } = useAuth();

  return (
    <HeaderWrap>
      <Logo onClick={() => navi(isLogin ? "/today" : "/login")}>O2do</Logo>

      <Spacer />

      {isLogin ? (
        <HamburgerButton type="button" onClick={onMenuClick} aria-label="메뉴 열기">
          <Bar />
          <Bar />
          <Bar />
        </HamburgerButton>
      ) : (
        <LoginBtn type="button" onClick={() => navi("/login")}>
          로그인
        </LoginBtn>
      )}
    </HeaderWrap>
  );
};

export default Header;
