// import useGlobalFilter hook from 'react-table' for filtering purpose
import { useMemo } from 'react'
import { useTable, useGlobalFilter } from 'react-table'
import { COLUMNS } from '../columns'
import { GlobalFilter } from './GlobalFilter'
import MOCK_DATA from '../MOCK_DATA.json'
import '../table.css'

export const FilteringTable = () => {
    
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable(
    {
      columns: columns,
      data: data
    },
    useGlobalFilter
  )

// destructuring and adding state, setGlobalFilter() fn
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = tableInstance

  const { globalFilter } = state

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <table {...getTableProps()}>

        <thead>
          { 
            headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              { headerGroup.headers.map((column) => (
                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
