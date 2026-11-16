import PageHeader from '@/components/common/PageHeader'
import StatusBadge from '@/components/common/StatusBadge'
import { Button } from '@/components/ui/button'

export default function Dtin() {
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
        <Button variant="outline"></Button>
      </PageHeader>
    </div>
  )
}
