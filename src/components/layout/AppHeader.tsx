import { MENUS } from '@/constants/menu'
import { DASHBOARD_URL } from '@/constants/urls'
import { cn } from '@/lib/utils'
import { Link, NavLink, useLocation } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export default function AppHeader({ className }: { className?: string }) {
  const { pathname } = useLocation()

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
            <DropdownMenu key={m.title}>
              <DropdownMenuTrigger
                className={cn(
                  'flex items-center gap-1 outline-none',
                  // 하위 메뉴 중 하나에 있으면 그룹도 굵게
                  m.children?.some((c) => c.url === pathname) && 'font-bold',
                )}
              >
                {m.title}
                <ChevronDown className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {m.children?.map((c) => (
                  <DropdownMenuItem key={c.title} asChild>
                    <NavLink to={c.url!}>{c.title}</NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        )}
      </nav>
    </header>
  )
}
