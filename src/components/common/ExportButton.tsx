import type { LucideIcon } from 'lucide-react'
import {
  ChevronDown,
  Download,
  FileDown,
  FileSpreadsheet,
  SquareArrowOutUpRight,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type Props = {
  onSheet?: () => void
  onExcelDown?: () => void
  onExcelTem?: () => void
  onExcelUp?: () => void
}

export default function ExportButton({ onSheet, onExcelDown, onExcelTem, onExcelUp }: Props) {
  // 그룹별로 나누고, 빈 그룹은 버림 → 그룹 사이에만 구분선
  const groups = [
    [
      onSheet && (
        <MenuRow
          key="sheet"
          icon={FileSpreadsheet}
          tone="green"
          external
          title="구글 시트로 열기"
          description="실시간 스프레드시트 연동"
          onSelect={onSheet}
        />
      ),
    ],
    [
      onExcelDown && (
        <MenuRow
          key="down"
          icon={Download}
          title="엑셀 다운로드"
          description="조회 목록 전체 내보내기"
          onSelect={onExcelDown}
        />
      ),
      onExcelTem && (
        <MenuRow
          key="tem"
          icon={FileDown}
          title="엑셀 양식 다운로드"
          description="대량 등록용 표준 템플릿"
          onSelect={onExcelTem}
        />
      ),
    ],
    [
      onExcelUp && (
        <MenuRow
          key="up"
          icon={Upload}
          tone="violet"
          title="엑셀 업로드"
          description=".xlsx, .xls 파일 일괄 등록"
          onSelect={onExcelUp}
        />
      ),
    ],
  ]
    .map((g) => g.filter(Boolean))
    .filter((g) => g.length > 0)

  if (groups.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'group h-9 gap-2 rounded-xl border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-700 shadow-2xs',
            'hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700',
            // 메뉴가 열렸을 때
            'data-[state=open]:border-indigo-600 data-[state=open]:bg-white data-[state=open]:text-indigo-700 data-[state=open]:ring-3 data-[state=open]:ring-indigo-600/15',
          )}
        >
          <FileSpreadsheet className="size-4 text-emerald-600" />
          시트 · 엑셀 관리
          <ChevronDown className="size-3.5 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-indigo-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-xl p-1.5 shadow-lg ring-slate-200"
      >
        {groups.map((g, i) => (
          <div key={i}>
            {i > 0 && <DropdownMenuSeparator className="mx-1.5 my-1.5 bg-slate-100" />}
            {g}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── 이 파일 안에서만 쓰는 메뉴 항목 ──
// 메뉴 항목은 focus 시 하위 글자색을 덮어쓰기 때문에, 유지할 색에는 ! (important) 를 붙임
const TONES = {
  gray: { box: 'border-slate-200 bg-slate-50', icon: 'text-slate-500!', title: '' },
  green: { box: 'border-emerald-100 bg-emerald-50', icon: 'text-emerald-600!', title: '' },
  violet: {
    box: 'border-indigo-100 bg-indigo-50',
    icon: 'text-indigo-600!',
    title: 'text-indigo-700!',
  },
}

type MenuRowProps = {
  icon: LucideIcon
  title: string
  description?: string
  external?: boolean
  tone?: keyof typeof TONES
  onSelect: () => void
}

function MenuRow({
  icon: Icon,
  title,
  description,
  external,
  tone = 'gray',
  onSelect,
}: MenuRowProps) {
  const t = TONES[tone]

  return (
    <DropdownMenuItem
      onSelect={onSelect}
      className="gap-3 rounded-lg px-2.5 py-2 focus:bg-slate-50"
    >
      <span
        className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg border', t.box)}
      >
        <Icon className={cn('size-4', t.icon)} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cn(
            'flex items-center gap-1 text-[13px] font-semibold text-slate-800!',
            t.title,
          )}
        >
          {title}
          {external && <SquareArrowOutUpRight className="size-3 text-slate-400!" />}
        </span>
        {description && <span className="truncate text-[11px] text-slate-400!">{description}</span>}
      </span>
    </DropdownMenuItem>
  )
}
