import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from './components/layout/DefaultLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import MyPage from './pages/MyPage'
import TodayTodoPage from './pages/TodayTodoPage'
import TodoListsPage from './pages/TodoListsPage'
import TodoFormPage from './pages/TodoFormPage'
import BacklogPage from './pages/BacklogPage'
import { useAuth } from './context/AuthContext'

const NotFoundRedirect = () => {
  const { isLogin } = useAuth()
  return <Navigate to={isLogin ? '/today' : '/login'} replace />
}

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

        <Route path="*" element={<NotFoundRedirect />} />
      </Route>
    </Routes>
  )
}

export default App
