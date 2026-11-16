import { MENUS } from '@/constants/menu'
import { DASHBOARD_URL } from '@/constants/urls'
import { cn } from '@/lib/utils'
import { Link, NavLink } from 'react-router'

export default function AppHeader({ className }: { className?: string }) {
  return (
    <header className={cn('flex h-14 items-center gap-6 border-b px-6', className)}>
      <Link to={DASHBOARD_URL} className="font-bold">
        REVE
      </Link>
      <nav className="flex gap-4 text-sm">
        {MENUS.map((m) =>
          m.url ? (
            <NavLink
              key={m.title}
              to={m.url}
              className={({ isActive }) => cn(isActive && 'font-bold')}
            >
              {m.title}
            </NavLink>
          ) : (
            <span key={m.title}>{m.title}</span>
          ),
        )}
      </nav>
    </header>
  )
}
