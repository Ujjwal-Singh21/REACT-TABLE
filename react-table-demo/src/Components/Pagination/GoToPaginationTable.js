import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from '../columns'
import '../table.css'

export const GoToPaginationTable = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns: columns,
    data: data,
    //changing default pageIndex value from 0 to 5 hence fresh page will load at 5 + 1 => 6
    initialState: {
        pageIndex: 5
    }
  },
  usePagination)

  // added gotoPage, pageCount,
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
    gotoPage,
    pageCount,
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

        <span>
            | GotoPage: {''}
            <input type='number' defaultValue={pageIndex + 1} onChange={(e) => {
                const pgNum = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pgNum)
            }} 
            style={{width: '50px'}}/>
        </span>

        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>

        <button onClick={() => previousPage()} disabled={!canPreviousPage}> Previous page </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}> Next page </button>

        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
    </div>
    </>
  )
}
