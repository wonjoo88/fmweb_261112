import { createBrowserRouter, Navigate } from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/dashboard'
import Login from '@/pages/login'
import Dtin from '@/pages/dtin'
import Dtob from '@/pages/dtob'
import Dtivr from './pages/dtivr'
import { LOGIN_URL, DASHBOARD_URL, DTIN_URL, DTOB_URL, DTIVR_URL } from '@/constants/urls'

export const router = createBrowserRouter([
  { path: LOGIN_URL, element: <Login /> },
  {
    element: <AppLayout />,
    children: [
      { path: DASHBOARD_URL, element: <Dashboard /> },
      { path: DTIN_URL, element: <Dtin /> },
      { path: DTOB_URL, element: <Dtob /> },
      { path: DTIVR_URL, element: <Dtivr /> },
    ],
  },
  { path: '*', element: <Navigate to={DASHBOARD_URL} replace /> },
])
