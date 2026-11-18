import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useId } from 'react'

type OPTIONS = { value: string; label: string }

type Props = {
  title: string
  option: OPTIONS[]
  value: string
  onChange: (value: string) => void
}

export default function FiledSearch({ title, option, value, onChange }: Props) {
  const id = useId()

  return (
    <Field className="gap-0">
      <FieldLabel htmlFor={id} className="text-muted-foreground">
        {title}
      </FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="전체" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {option &&
              option.map((v) => (
                <SelectItem key={v.value} value={v.value}>
                  {v.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
