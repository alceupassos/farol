import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Column<T> {
  accessorKey: keyof T | string
  header: string
  cell?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "Nenhum dado encontrado",
  className,
}: DataTableProps<T>) {
  // Verificações de segurança
  if (!Array.isArray(columns) || !Array.isArray(data)) {
    return (
      <div className={className}>
        <div className="rounded-md border p-4">
          <p className="text-center text-muted-foreground">Erro: Dados inválidos</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={column.accessorKey ? String(column.accessorKey) : `header-${index}`}>
                  {column.header || 'Coluna'}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {columns.map((column, colIndex) => {
                    let cellContent: React.ReactNode = '';
                    
                    try {
                      if (column.cell && typeof column.cell === 'function') {
                        cellContent = column.cell(row);
                      } else if (column.accessorKey && row && typeof row === 'object') {
                        const value = row[column.accessorKey as keyof T];
                        cellContent = value != null ? String(value) : '';
                      }
                    } catch (error) {
                      console.warn('DataTable cell render error:', error);
                      cellContent = '';
                    }
                    
                    return (
                      <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
