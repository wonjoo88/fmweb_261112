import { flexRender, useTable, type ColumnDef, type RowData } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { gridFeatures } from '@/lib/grid'

// const features = tableFeatures({})

type Props<TData extends RowData> = {
  data: TData[]
  columns: ColumnDef<typeof gridFeatures, TData, unknown>[]
  onRowClick?: (row: TData) => void
}

export default function DataGrid<TData extends RowData>({
  data,
  columns,
  onRowClick,
}: Props<TData>) {
  const table = useTable({ features: gridFeatures, columns, data })

  return (
    <Table className="mt-15">
      <TableHeader>
        {table.getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {hg.headers.map((h) => (
              <TableHead key={h.id}>
                {flexRender(h.column.columnDef.header, h.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
            className={onRowClick && 'cursor-pointer'}
          >
            {row.getAllCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
