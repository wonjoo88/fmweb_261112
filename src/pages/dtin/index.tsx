import DataGrid from '@/components/common/DataGrid'
import ExportButton from '@/components/common/ExportButton'
import FieldDatePicker from '@/components/common/FieldDatePicker'
import FiledSearch from '@/components/common/FiledSearch'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import StatusBadge from '@/components/common/StatusBadge'
import { DTIN_DUMMY } from '@/mocks/dtin'
import { subDays } from 'date-fns'
import { useState } from 'react'
import { dtinColumns } from './columns'
import type { DtinItem } from '@/types/dtin'
import DtinDetailDialog from './DtinDetailDialog'

const initial = () => ({
  wmsLinkId: '',
  startDt: subDays(new Date(), 7),
  endDt: new Date(),
  searchDt: '',
  status: '',
  search: '',
})

type SearchForm = ReturnType<typeof initial>

const TEST_OPTIONS = [
  { value: '11', label: '피카츄' },
  { value: '12', label: '라이츄' },
  { value: '13', label: '파이리' },
  { value: '14', label: '꼬부기' },
  { value: '15', label: '버터플' },
]

export default function Dtin() {
  const [form, setForm] = useState(initial)
  const [selected, setSelected] = useState<DtinItem | null>(null)

  const set =
    <K extends keyof SearchForm>(key: K) =>
    (value: SearchForm[K]) => {
      setForm((f) => ({ ...f, [key]: value }))
    }

  const handleSearch = () => {
    console.log(form)
  }

  const handleRowDetail = (item: DtinItem) => setSelected(item)

  return (
    <div>
      <PageHeader
        badge={
          <>
            <StatusBadge label="입고완료" count={100} tone="green" />
            <StatusBadge label="작업중" count={1} tone="blue" />
            <StatusBadge label="대기" count={1} tone="amber" />
          </>
        }
      >
        <div>
          <ExportButton onSheet={() => {}} onExcelDown={() => {}} />
        </div>
      </PageHeader>
      <SearchPanel
        keywordPlaceholder="검색어를 입력해주세요."
        keyword={form.search}
        onKeywordChange={set('search')}
        detailSearch={
          <>
            <FiledSearch
              title="ORDER STATUS"
              option={TEST_OPTIONS}
              value={form.status}
              onChange={set('status')}
            />
          </>
        }
        detailSearchTitle={'Detailed Search'}
        onReset={() => setForm(initial())}
        onSearch={handleSearch}
      >
        <FiledSearch
          title="WMS"
          option={TEST_OPTIONS}
          value={form.wmsLinkId}
          onChange={set('wmsLinkId')}
        />
        <FieldDatePicker title="시작일" value={form.startDt} onChange={set('startDt')} />
        <FieldDatePicker title="종료일" value={form.endDt} onChange={set('endDt')} />
        <FiledSearch
          title="기준일자"
          option={TEST_OPTIONS}
          value={form.searchDt}
          onChange={set('searchDt')}
        />
      </SearchPanel>

      <DataGrid data={DTIN_DUMMY} columns={dtinColumns} onRowClick={handleRowDetail} />

      <DtinDetailDialog item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
