import { Navigate, Route, Routes } from 'react-router-dom'
import { ErrMsg, ErrSpace } from './App.styles'
import DefaultLayout from './components/layout/DefaultLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import MyPage from './pages/MyPage'
import TodayTodoPage from './pages/TodayTodoPage'
import TodoListsPage from './pages/TodoListsPage'
import TodoFormPage from './pages/TodoFormPage'
import BacklogPage from './pages/BacklogPage'

const ErrPage = () => (
  <ErrSpace>
    <ErrMsg>없는 페이지입니다.</ErrMsg>
  </ErrSpace>
)

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Navigate to="/today" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback" element={<OAuthCallbackPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/today" element={<TodayTodoPage />} />
          <Route path="/todos" element={<TodoListsPage />} />
          <Route path="/todos/backlog" element={<BacklogPage />} />
          <Route path="/todos/new" element={<TodoFormPage />} />
          <Route path="/todos/:id/edit" element={<TodoFormPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        <Route path="*" element={<ErrPage />} />
      </Route>
    </Routes>
  )
}

export default App
