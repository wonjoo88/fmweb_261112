import { Outlet } from 'react-router'
import AppHeader from './AppHeader'

export default function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  )
}
