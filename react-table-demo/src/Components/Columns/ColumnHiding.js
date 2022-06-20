// destructuring allColumns, getToggleHideAllColumnProps() function from the table instance 
import { useMemo } from 'react'
import { useTable, useColumnOrder } from 'react-table'
import { COLUMNS } from '../columns'
import MOCK_DATA from '../MOCK_DATA.json'
import { Checkbox } from '../SelectingRows/Checkbox'
import '../table.css'

export const ColumnHiding = () => {

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
    allColumns,
    getToggleHideAllColumnsProps
  } = tableInstance

  return (
    <>
    <div>
        <div>
            <Checkbox {...getToggleHideAllColumnsProps()}/> Toogle All
        </div>
        {
            allColumns.map((column) => (
                <div key={column.id}>
                   <label>
                      <input type='checkbox' {...column.getToggleHiddenProps()} />
                       {column.Header}
                   </label>
                </div>
            ))
        }
    </div>

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
