import { useNavigate } from "react-router-dom";
import { FooterWrapper, FooterLogo, FooterText } from "./Footer.styles";

const Footer = () => {
  const navi = useNavigate();

  return (
    <FooterWrapper>
      <FooterLogo onClick={() => navi("/")}>O2do</FooterLogo>
      <FooterText>오늘의 TODO</FooterText>
    </FooterWrapper>
  );
};

export default Footer;
