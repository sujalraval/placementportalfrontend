import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { PortalLayout } from '@/layouts/PortalLayout'
import { LandingPage } from '@/pages/public/LandingPage'
import { PersonaIndexRedirect } from '@/routes/PersonaIndexRedirect'
import { PersonaPage } from '@/routes/PersonaPage'
import { ChatWidget } from '@/components/shared/ChatWidget'

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path=":persona" element={<PortalLayout />}>
          <Route index element={<PersonaIndexRedirect />} />
          <Route path=":page" element={<PersonaPage />} />
        </Route>
      </Routes>
      <ChatWidget />
    </>
  )
}

export default App
