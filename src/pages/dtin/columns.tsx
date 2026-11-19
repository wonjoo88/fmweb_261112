import CopyCell from '@/components/common/CopyCell'
import type { gridFeatures } from '@/lib/grid'
import type { DtinItem } from '@/types/dtin'
import { createColumnHelper } from '@tanstack/react-table'

const col = createColumnHelper<typeof gridFeatures, DtinItem>()

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
