import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The private visitor ledger lives at /analytics and loads in its own chunk
const AnalyticsPage = lazy(() => import('./AnalyticsPage.jsx'))
const isAnalyticsRoute = window.location.pathname.replace(/\/+$/, '') === '/analytics'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAnalyticsRoute ? (
      <Suspense fallback={null}>
        <AnalyticsPage />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
