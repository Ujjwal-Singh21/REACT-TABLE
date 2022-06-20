// importing useColumnOrder hook from react-table, and 
// destructuring setColumnOrder() function from the table instance 
import { useMemo } from 'react'
import { useTable, useColumnOrder } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from '../columns'
import '../table.css'

export const ColumnOrder = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns: columns,
    data: data
  }, useColumnOrder)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setColumnOrder
  } = tableInstance

  const myColumnOrderArr = [
    'id',
    'first_name',
    'last_name',
    'phone',
    'country',
    'date_of_birth'
]

  const changeOrderFn = () => {
    setColumnOrder(myColumnOrderArr)
  }

  return (
    <>
    <button onClick={changeOrderFn}> Change Column Order </button>

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
         rows.map((row) => {
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

    </>
  )
}
