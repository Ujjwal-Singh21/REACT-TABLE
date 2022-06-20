import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from '../columns'
import '../table.css'

export const PaginationTable = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns: columns,
    data: data
  },
  usePagination)

  // page, nextPage, previousPage, canNextPage, canPreviousPage, state, pageOptions,
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    pageOptions,
    prepareRow
  } = tableInstance

  const { pageIndex } = state

  return (
    <>
    <table {...getTableProps()}>
      <thead>
      {
        headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
          {
            headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}> {column.render('Header')} </th>
            ))
          } 
        </tr>
        ))
      }
       
      </thead>
      <tbody {...getTableBodyProps()}>
       {
         page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
              {
                row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                ))
              }             
            </tr>
            )
         })
       } 
      </tbody>
    </table>

    <div>
        <span>
            Page {''} <strong> { pageIndex + 1 } of { pageOptions.length } {''} </strong>
        </span>
        
        <button onClick={() => previousPage()} disabled={!canPreviousPage}> Previous page </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}> Next page </button>
    </div>
    </>
  )
}
