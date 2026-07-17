import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { PortalDataProvider } from '@/context/PortalDataContext'
import { RecruiterDataProvider } from '@/context/RecruiterDataContext'
import { AdminDataProvider } from '@/context/AdminDataContext'
import { DocViewerProvider } from '@/context/DocViewerContext'

// Provider order matters: ModalProvider and DocViewerProvider render their
// overlay content (the modal body / doc content passed in by callers) as a
// sibling of `{children}`, not nested inside it. Any provider whose context
// a modal or doc body might consume (Toast, PortalData, RecruiterData,
// AdminData) must therefore sit ABOVE Modal/DocViewer in the tree, not below
// — otherwise that overlay content renders outside the provider's subtree
// and hooks like usePortalData() throw.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <PortalDataProvider>
          <RecruiterDataProvider>
            <AdminDataProvider>
              <DocViewerProvider>
                <ModalProvider>
                  <App />
                </ModalProvider>
              </DocViewerProvider>
            </AdminDataProvider>
          </RecruiterDataProvider>
        </PortalDataProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
