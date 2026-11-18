import { useId, useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Field, FieldLabel } from '@/components/ui/field'

type Props = {
  title: string
  value: Date
  onChange: (date: Date) => void
}

export default function FieldDatePicker({ title, value, onChange }: Props) {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Field className="gap-0">
      <FieldLabel htmlFor={id} className="text-muted-foreground">
        {title}
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id={id} variant="outline" className="w-full justify-start text-left font-normal">
            <CalendarIcon />
            {format(value, 'yyyy. MM. dd.')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            required
            selected={value}
            onSelect={(d) => {
              onChange(d)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
