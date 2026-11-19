import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { DtinItem } from '@/types/dtin'

type Props = {
  item: DtinItem | null
  onClose: () => void
}

export default function DtinDetailDialog({ item, onClose }: Props) {
  return (
    <Dialog open={item !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item?.ganNo}</DialogTitle>
        </DialogHeader>
        {/* item?.prodList 등 상세 내용 */}
      </DialogContent>
    </Dialog>
  )
}
