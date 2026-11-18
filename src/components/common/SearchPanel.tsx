import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  children: ReactNode
  keywordPlaceholder?: string
  detailSearch?: ReactNode
  onReset: () => void
  onSearch: () => void
  detailSearchTitle?: string
  keyword?: string
  onKeywordChange?: (v: string) => void
}

export default function SearchPanel({
  children,
  keywordPlaceholder,
  detailSearch,
  onReset,
  onSearch,
  detailSearchTitle,
  keyword,
  onKeywordChange
}: Props) {
  const [detailOpen, setDetailOpen] = useState<boolean>(false)

  return (
    <form
      className="rounded-md border border-gray-100 bg-white p-5"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
    >
      <div className="mb-4 grid grid-cols-4 gap-4">{children}</div>
      <div className="flex justify-between gap-2">  
        {keywordPlaceholder && <Input value={keyword} placeholder={keywordPlaceholder} onChange={(e)=> onKeywordChange?.(e.target.value)}/>}
        <div className="ml-auto flex gap-1">
          <Button type="button" variant="outline" size="icon" onClick={onReset}>
            <RotateCcw />
          </Button>
          <Button type="submit" variant="default">
            조회
          </Button>
        </div>
      </div>
      {detailSearch && (
        <div className="mt-5 border-t">
          <div className="mt-5 flex items-center justify-between">
            <h2 className="font-bold">{detailSearchTitle}</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setDetailOpen((prev) => !prev)}
            >
              {detailOpen ? '상세조건 접기' : '상세조건 펼치기'}
              {detailOpen ? (
                <ChevronUp data-icon="inline-end" />
              ) : (
                <ChevronDown data-icon="inline-end" />
              )}
            </Button>
          </div>
          {detailOpen && <div className="mt-4 grid grid-cols-4 gap-4">{detailSearch}</div>}
        </div>
      )}
    </form>
  )
}
