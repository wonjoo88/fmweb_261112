import ExportButton from '@/components/common/ExportButton'
import FieldDatePicker from '@/components/common/FieldDatePicker'
import FiledSearch from '@/components/common/FiledSearch'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import StatusBadge from '@/components/common/StatusBadge'
import { subDays } from 'date-fns'
import { useState } from 'react'

const TEST_OPTIONS = [
  { value: '11', label: '피카츄' },
  { value: '12', label: '라이츄' },
  { value: '13', label: '파이리' },
  { value: '14', label: '꼬부기' },
  { value: '15', label: '버터플' },
]

export default function Dtin() {
  const [wms, setWms] = useState('')
  const [searchDt, setSearchDt] = useState('')
  const [status, setStatus] = useState('')
  const [orderStatus, setOrderStatus] = useState('')

  const [startDate, setStartDate] = useState(() => subDays(new Date(), 7))
  const [endDate, setEndDate] = useState(() => new Date())

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
        detailSearch={
          <>
            <FiledSearch
              title="ORDER STATUS"
              option={TEST_OPTIONS}
              value={orderStatus}
              onChange={setOrderStatus}
            />
          </>
        }
        detailSearchTitle={'Detailed Search'}
        onReset={() => {}}
        onSearch={() => {}}
      >
        <FiledSearch title="WMS" option={TEST_OPTIONS} value={wms} onChange={setWms} />
        <FieldDatePicker title="시작일" value={startDate} onChange={setStartDate} />
        <FieldDatePicker title="종료일" value={endDate} onChange={setEndDate} />
        <FiledSearch
          title="기준일자"
          option={TEST_OPTIONS}
          value={searchDt}
          onChange={setSearchDt}
        />

        <FiledSearch title="입고상태" option={TEST_OPTIONS} value={status} onChange={setStatus} />
      </SearchPanel>
    </div>
  )
}
