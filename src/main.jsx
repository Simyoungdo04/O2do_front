import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './App.jsx'
import { GlobalStyle } from './styles/GlobalStyle'
import { DatePickerGlobalStyle } from './styles/DatePickerGlobalStyle'
import { AuthProvider } from './context/AuthContext'
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext'
import './utils/datepickerLocale'

function ThemedApp() {
  const { theme } = useThemeMode()
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DatePickerGlobalStyle />
      <App />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <AuthProvider>
          <ThemedApp />
        </AuthProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>,
)
