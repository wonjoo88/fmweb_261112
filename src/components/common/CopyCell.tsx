import { Copy } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { toast } from 'sonner'

type Props = {
  value: string
  label?: string
}

export default function CopuCell({ value, label = '값' }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-indigo-50 hover:text-primary"
        >
          {value}
          <Copy
            onClick={(e) => {
              e.stopPropagation()
              navigator.clipboard.writeText(value)
              toast.success(`${label}가 복사되었습니다.`)
            }}
            className="size-3 opacity-0 group-hover:opacity-100"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>클릭하여 {label} 복사</TooltipContent>
    </Tooltip>
  )
}
