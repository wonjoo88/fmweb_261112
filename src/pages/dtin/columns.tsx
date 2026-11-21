import CopyCell from '@/components/common/CopyCell'
import type { StatusTone } from '@/components/common/StatusBadge'
import StatusBadge from '@/components/common/StatusBadge'
import type { gridFeatures } from '@/lib/grid'
import type { DtinItem, DtinStatus } from '@/types/dtin'
import { createColumnHelper } from '@tanstack/react-table'

const col = createColumnHelper<typeof gridFeatures, DtinItem>()



const STATUS: Record<DtinStatus, { label: string; tone: StatusTone }> = {
  PLAN:      { label: '입고예정', tone: 'gray' },
  STANDBY:   { label: '대기',     tone: 'amber' },
  WORK:      { label: '작업중',   tone: 'blue' },
  COMPLETED: { label: '입고완료', tone: 'green' },
  CANCELED:  { label: '취소',   tone: 'violet' },
  UNKNOW:    { label: '알수없음', tone: 'gray' },
}


export const dtinColumns = col.columns([
  col.accessor('ganNo', {
    header: '주문번호',
    cell: (info) => <CopyCell value={info.getValue()} label="주문번호" />,
  }),
  col.accessor('dataId', {
    header: '접수번호',
    cell: (info) => <CopyCell value={info.getValue()} label="접수번호" />,
  }),
  col.accessor('status', {
    header: '입고상태',
    cell: (info) => {
      const s = STATUS[info.getValue()]
      if (!s) return '-'
      return <StatusBadge label={s.label} tone={s.tone} className="rounded-full" />
    },
  }),
  col.accessor('cntyCd', {
    header: '국가',
  }),
  col.accessor('wmsLinkName', {
    header: 'WMS LINK',
  }),
  col.accessor('reqDt', {
    header: '입고 접수일',
  }),
  col.accessor('arvDt', {
    header: '창고 도착일',
  }),
  col.accessor('dataRegDt', {
    header: '입고 완료일',
  }),
])
