import { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from '../columns'
import '../table.css'
import { Checkbox } from './Checkbox'

export const RowSelection = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  // adding useRowSelect hook as 2nd arg to useTable hook
  const tableInstance = useTable({
    columns: columns,
    data: data
  }, 
  useRowSelect,
  (hooks) => { 
    hooks.visibleColumns.push((columns) => {
      return [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()}/>
          ),
          Cell: ({ row }) => (
            <Checkbox {...row.getToggleRowSelectedProps()}/>
          )
        },
        ...columns
      ]
    })
  }
  )

  // destructuring and adding selectedFlatRows from table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  } = tableInstance

  const firstPageRows = rows.slice(0, 10)

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
         firstPageRows.map((row) => {
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

      <tfoot>
         {
           footerGroups.map((footerGroup) => (
             <tr {...footerGroup.getHeaderGroupProps()}>
               {
                  footerGroup.headers.map((column) => (
                     <td {...column.getFooterProps}> {column.render('Footer')} </td>
                  ))
               }
             </tr>
           ))
         }
      </tfoot>
    </table>

    <pre>
      <code>
        {
          JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )
        }
      </code>
    </pre>

    </>
  )
}
