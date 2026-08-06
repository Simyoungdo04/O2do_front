import { useNavigate } from "react-router-dom";
import {
  HeaderWrap,
  Logo,
  Spacer,
  HamburgerButton,
  Bar,
} from "./Header.styles";
import { useAuth } from "../../../context/AuthContext";

const Header = ({ onMenuClick }) => {
  const navi = useNavigate();
  const { isLogin } = useAuth();

  return (
    <HeaderWrap>
      <Logo onClick={() => navi(isLogin ? "/today" : "/login")}>O2DO</Logo>

      <Spacer />

      {isLogin && (
        <HamburgerButton
          type="button"
          onClick={onMenuClick}
          aria-label="메뉴 열기"
        >
          <Bar />
          <Bar />
          <Bar />
        </HamburgerButton>
      )}
    </HeaderWrap>
  );
};

export default Header;
