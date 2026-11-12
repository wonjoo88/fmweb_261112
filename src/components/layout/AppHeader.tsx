import { cn } from '@/lib/utils'
import { Link } from 'react-router'

export default function AppHeader({ className }: { className?: string }) {
  return (
    <header className={cn('flex h-14 items-center gap-6 border-b px-6', className)}>
      <Link to="/" className="font-bold">REVE</Link>
      <nav className="flex gap-4 text-sm">
        <Link to="/dtin">입고현황</Link>
      </nav>
    </header>
  )
}