import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { PortalLayout } from '@/layouts/PortalLayout'
import { LandingPage } from '@/pages/public/LandingPage'
import { PersonaIndexRedirect } from '@/routes/PersonaIndexRedirect'
import { PersonaPage } from '@/routes/PersonaPage'
import { ChatWidget } from '@/components/shared/ChatWidget'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuthStore } from './store/useAuthStore'
import { authApi } from './api/auth'

function App() {
  const { token, setAuth, clearAuth, setLoading } = useAuthStore()

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const user = await authApi.getMe();
          setAuth(token, user);
        } catch (error) {
          clearAuth();
        }
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route element={<ProtectedRoute />}>
          <Route path=":persona" element={<PortalLayout />}>
            <Route index element={<PersonaIndexRedirect />} />
            <Route path=":page" element={<PersonaPage />} />
          </Route>
        </Route>
      </Routes>
      <ChatWidget />
    </>
  )
}

export default App
