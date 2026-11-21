import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const TONES = {
  green: { box: 'border-emerald-200 bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  blue: { box: 'border-indigo-200 bg-indigo-50 text-indigo-700', dot: 'bg-indigo-500' },
  amber: { box: 'border-amber-200 bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  violet: { box: 'border-violet-200 bg-violet-50 text-violet-700', dot: 'bg-violet-500' },
  gray: { box: 'border-gray-200 bg-gray-50 text-gray-700', dot: 'bg-gray-500' },
}


export type StatusTone = keyof typeof TONES

type Props = {
  label: string
  count?: number
  tone: keyof typeof TONES
  className?: string 
}

export default function StatusBadge({ label, count, tone, className }: Props) {
  const t = TONES[tone]

  return (
    <Badge variant="outline" className={cn('rounded-[5px]', t.box, className)}>
      <span className={cn('size-1.5 rounded-full', t.dot)} />
      {label} {count}
    </Badge>
  )
}
