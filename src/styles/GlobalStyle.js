import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }

  body {
    font-family: ${({ theme }) => theme.font};
    background: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.text};
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  button, input, textarea {
    font-family: ${({ theme }) => theme.font};
  }
`;
