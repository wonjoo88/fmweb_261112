import { createBrowserRouter, Navigate } from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/dashboard'
import Login from '@/pages/login'
import Dtin from '@/pages/dtin'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },        // 사이드바 없음
  {
    element: <AppLayout />,                      // 사이드바 + 상단바 + <Outlet />
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/dtin', element: <Dtin /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])