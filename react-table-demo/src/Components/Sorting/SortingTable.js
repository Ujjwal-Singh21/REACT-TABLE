// we use useSortBy() hook and getSortByToggleProps() fn from react-table library for sorting purpose.
import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from '../columns'
import MOCK_DATA from '../MOCK_DATA.json'
import '../table.css'

export const SortingTable = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns: columns,
    data: data
  }, useSortBy)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
    <table {...getTableProps()}>

      <thead>
      {
        headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
          {
            headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                 {column.render('Header')} 
                 <span>
                    {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                 </span>
              </th>
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
  )
}
